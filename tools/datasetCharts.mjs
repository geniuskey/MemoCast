import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function parseCsv(csvText) {
  const rows = csvText.trim().split(/\r?\n/).filter(Boolean).map(parseCsvLine)
  const headers = rows.shift() ?? []
  return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])))
}

export function buildDatasetCharts(csvFiles) {
  const bitRows = parseCsv(csvFiles['bit-demand-supply-growth.csv'] ?? '')
  const revenueRows = parseCsv(csvFiles['dram-revenue-cycle-history.csv'] ?? '')
  const financialRows = parseCsv(csvFiles['memory-makers-quarterly-financials-cycle.csv'] ?? '')
  const smartphoneShipmentRows = parseCsv(csvFiles['smartphone-shipments.csv'] ?? '')
  const pcServerShipmentRows = parseCsv(csvFiles['pc-server-shipments.csv'] ?? '')
  const contentRows = parseCsv(csvFiles['memory-content-per-device.csv'] ?? '')
  const gpuHbmRows = parseCsv(csvFiles['gpu-hbm-capacity.csv'] ?? '')
  const aiPcRows = parseCsv(csvFiles['ai-pc-penetration-forecast.csv'] ?? '')
  const aiServerRows = parseCsv(csvFiles['ai-server-shipments-forecast.csv'] ?? '')
  const domainTaxonomyRows = parseCsv(csvFiles['memory-demand-domain-taxonomy.csv'] ?? '')
  const periodDemandTimeline = buildPeriodDemandTimeline({
    smartphoneShipmentRows,
    pcServerShipmentRows,
    contentRows,
    gpuHbmRows,
    aiPcRows,
    aiServerRows
  })
  const domainTaxonomy = buildDomainTaxonomy(domainTaxonomyRows)

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      datasetCount: Object.keys(csvFiles).length,
      bitGrowthRows: bitRows.length,
      revenueCycleRows: revenueRows.length,
      financialRows: financialRows.length,
      periodDemandRows: periodDemandTimeline.length,
      domainTaxonomyRows: domainTaxonomy.length
    },
    bitGrowth: bitRows.map((row) => ({
      year: toNumber(row.year),
      memoryType: row.memory_type,
      metric: row.metric,
      growthPercent: toNumber(row.growth_percent),
      notes: row.notes
    })),
    revenueCycle: revenueRows.map((row) => ({
      year: toNumber(row.year),
      dramRevenueUsdB: toNumber(row.dram_revenue_usd_b),
      yoyPct: toOptionalNumber(row.yoy_pct),
      cyclePhase: row.cycle_phase,
      confidence: row.confidence,
      sourceNote: row.source_note
    })),
    financials: financialRows.map((row) => ({
      company: row.company,
      period: row.period,
      revenue: toOptionalNumber(row.revenue),
      revenueUnit: row.revenue_unit,
      operatingProfit: toOptionalNumber(row.operating_profit),
      profitUnit: row.profit_unit,
      note: row.note,
      confidence: row.confidence
    })),
    periodDemandTimeline,
    domainTaxonomy
  }
}

export function writeDatasetCharts({ rawDatasetDir, outputPath }) {
  const wanted = [
    'bit-demand-supply-growth.csv',
    'dram-revenue-cycle-history.csv',
    'memory-makers-quarterly-financials-cycle.csv',
    'smartphone-shipments.csv',
    'pc-server-shipments.csv',
    'memory-content-per-device.csv',
    'gpu-hbm-capacity.csv',
    'ai-pc-penetration-forecast.csv',
    'ai-server-shipments-forecast.csv',
    'memory-demand-domain-taxonomy.csv'
  ]
  const csvFiles = Object.fromEntries(wanted.map((fileName) => [fileName, fs.readFileSync(path.join(rawDatasetDir, fileName), 'utf8')]))
  const charts = buildDatasetCharts(csvFiles)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, `${JSON.stringify(charts, null, 2)}\n`)
  return charts
}

function buildPeriodDemandTimeline({ smartphoneShipmentRows, pcServerShipmentRows, contentRows, gpuHbmRows, aiPcRows, aiServerRows }) {
  const timeline = []
  const smartphoneContentByYear = new Map(
    contentRows
      .filter((row) => row.device === 'smartphone' && row.memory_type === 'DRAM' && row.avg_capacity_gb)
      .map((row) => [toNumber(row.year), row])
  )
  const serverContentByYear = new Map(
    contentRows
      .filter((row) => row.device === 'server' && row.memory_type === 'DRAM' && row.avg_capacity_gb)
      .map((row) => [toNumber(row.year), row])
  )

  for (const shipment of smartphoneShipmentRows) {
    const year = toNumber(shipment.year)
    const content = smartphoneContentByYear.get(year)
    if (!content) continue
    const shipmentsMillionUnits = toNumber(shipment.shipments_million_units)
    const avgCapacityGb = toNumber(content.avg_capacity_gb)
    timeline.push({
      year,
      segment: 'Smartphone DRAM',
      memoryType: 'DRAM',
      demandEb: round(shipmentsMillionUnits * avgCapacityGb / 1_000_000, 4),
      shipmentsMillionUnits,
      avgCapacityGb,
      confidence: 'medium',
      sourceRefs: ['raw/datasets/smartphone-shipments.md', 'raw/datasets/memory-content-per-device.md'],
      referenceNotes: [shipment.source_note, content.notes].filter(Boolean)
    })
  }

  for (const shipment of pcServerShipmentRows.filter((row) => row.category === 'server')) {
    const year = toNumber(shipment.year)
    const content = serverContentByYear.get(year)
    if (!content) continue
    const shipmentsMillionUnits = toNumber(shipment.shipments_million_units)
    const avgCapacityGb = toNumber(content.avg_capacity_gb)
    timeline.push({
      year,
      segment: 'Server DRAM',
      memoryType: 'DRAM',
      demandEb: round(shipmentsMillionUnits * avgCapacityGb / 1_000_000, 4),
      shipmentsMillionUnits,
      avgCapacityGb,
      confidence: 'medium',
      sourceRefs: ['raw/datasets/pc-server-shipments.md', 'raw/datasets/memory-content-per-device.md'],
      referenceNotes: [shipment.source, shipment.notes, content.notes].filter(Boolean)
    })
  }

  const aiPcByYear = new Map(aiPcRows
    .filter((row) => row.year && (row.ai_pc_units_m || row.ai_pc_share_pct))
    .map((row) => [toNumber(row.year), row]))
  for (const shipment of pcServerShipmentRows.filter((row) => row.category === 'PC')) {
    const year = toNumber(shipment.year)
    const aiPc = aiPcByYear.get(year)
    if (!aiPc) continue
    const shipmentsMillionUnits = toNumber(shipment.shipments_million_units)
    const aiPcUnitsMillion = toOptionalNumber(aiPc.ai_pc_units_m) ?? round(shipmentsMillionUnits * toNumber(aiPc.ai_pc_share_pct) / 100, 4)
    const mainstreamPcUnitsMillion = Math.max(0, shipmentsMillionUnits - aiPcUnitsMillion)
    const mainstreamCapacityGb = 8
    const aiPcCapacityGb = 16
    const weightedAvgCapacityGb = round(((mainstreamPcUnitsMillion * mainstreamCapacityGb) + (aiPcUnitsMillion * aiPcCapacityGb)) / Math.max(shipmentsMillionUnits, 1), 2)
    timeline.push({
      year,
      segment: 'PC DRAM',
      memoryType: 'DRAM',
      demandEb: round((mainstreamPcUnitsMillion * mainstreamCapacityGb + aiPcUnitsMillion * aiPcCapacityGb) / 1_000_000, 4),
      shipmentsMillionUnits,
      avgCapacityGb: weightedAvgCapacityGb,
      confidence: 'low',
      sourceRefs: ['raw/datasets/pc-server-shipments.md', 'raw/datasets/ai-pc-penetration-forecast.md', 'raw/articles/microsoft-ai-pc-16gb-ram-baseline.md'],
      referenceNotes: [shipment.source, shipment.notes, aiPc.note, `${round(aiPcUnitsMillion, 1)}M AI PCs at 16GB baseline; remaining PCs at 8GB baseline`].filter(Boolean)
    })
  }

  const aiServerCapacityGb = 1024
  let lastAiServerUnitsMillion = 0
  for (const row of aiServerRows.filter((item) => item.year).sort((a, b) => toNumber(a.year) - toNumber(b.year))) {
    const directUnits = toOptionalNumber(row.ai_server_units_m)
    const yoyPct = toOptionalNumber(row.yoy_pct)
    const aiServerUnitsMillion = directUnits ?? (lastAiServerUnitsMillion && yoyPct !== null ? round(lastAiServerUnitsMillion * (1 + yoyPct / 100), 4) : null)
    if (aiServerUnitsMillion === null) continue
    lastAiServerUnitsMillion = aiServerUnitsMillion
    timeline.push({
      year: toNumber(row.year),
      segment: 'AI Server DRAM proxy',
      memoryType: 'DRAM',
      demandEb: round(aiServerUnitsMillion * aiServerCapacityGb / 1_000_000, 4),
      shipmentsMillionUnits: aiServerUnitsMillion,
      avgCapacityGb: aiServerCapacityGb,
      confidence: row.confidence || 'low',
      sourceRefs: ['raw/datasets/ai-server-shipments-forecast.md', 'raw/datasets/server-dram-content-per-box-growth.md'],
      referenceNotes: [row.note, '1TB/node proxy from AI-optimized 512GB/1TB/multi-TB server DRAM range'].filter(Boolean)
    })
  }

  for (const gpu of gpuHbmRows) {
    timeline.push({
      year: toNumber(gpu.launch_year),
      segment: 'AI GPU HBM content',
      memoryType: 'HBM',
      demandGbPerUnit: toNumber(gpu.hbm_capacity_gb),
      gpuModel: gpu.gpu_model,
      hbmType: gpu.hbm_type,
      confidence: 'high',
      sourceRefs: ['raw/datasets/gpu-hbm-capacity.md'],
      referenceNotes: [gpu.notes].filter(Boolean)
    })
  }

  return timeline.sort((a, b) => a.year - b.year || a.segment.localeCompare(b.segment))
}

function buildDomainTaxonomy(rows) {
  return rows
    .filter((row) => row.domain)
    .map((row) => ({
      domain: row.domain,
      group: row.group,
      memoryTypes: splitList(row.memory_types),
      demandModel: row.demand_model,
      primaryDrivers: splitList(row.primary_drivers),
      sourceRefs: splitList(row.source_refs),
      confidence: row.confidence,
      notes: row.notes
    }))
}

function splitList(value) {
  if (!value) return []
  return value.split(';').map((item) => item.trim()).filter(Boolean)
}

function parseCsvLine(line) {
  const cells = []
  let current = ''
  let quoted = false
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]
    const next = line[index + 1]
    if (char === '"' && quoted && next === '"') {
      current += '"'
      index += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (char === ',' && !quoted) {
      cells.push(current)
      current = ''
    } else {
      current += char
    }
  }
  cells.push(current)
  return cells
}

function round(value, digits = 4) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function toNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

function toOptionalNumber(value) {
  if (value === undefined || value === '' || value === '-') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function isMainModule() {
  return process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
}

if (isMainModule()) {
  const repoRoot = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : path.join(repoRoot, 'wiki', 'public', 'dataset-charts.json')
  const charts = writeDatasetCharts({ rawDatasetDir: path.join(repoRoot, 'raw', 'datasets'), outputPath })
  console.log(`Wrote ${outputPath} (${charts.summary.datasetCount} datasets, ${charts.summary.bitGrowthRows + charts.summary.revenueCycleRows + charts.summary.financialRows + charts.summary.periodDemandRows + charts.summary.domainTaxonomyRows} rows)`)
}
