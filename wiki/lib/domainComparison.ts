import { calculateHbmDemand, getHbmScenarioPreset } from './hbmDemand'
import { calculateNandSsdDemand, getNandSsdScenarioPreset } from './nandSsdDemand'
import { calculatePcDramDemand, getPcDramScenarioPreset } from './pcDramDemand'
import { calculateSmartphoneMemoryDemand, getScenarioPreset } from './smartphoneDemand'

export type DomainComparisonId = 'smartphone-dram' | 'smartphone-nand' | 'pc-dram' | 'ai-server-hbm' | 'nand-ssd'
export type MemoryFamily = 'DRAM' | 'NAND' | 'HBM'

export interface DomainComparisonRow {
  id: DomainComparisonId
  label: string
  family: MemoryFamily
  demandBasis: string
  totalDemandEb: number
  sourcePreset: string
  note: string
}

export interface ScenarioDeltaRow extends DomainComparisonRow {
  baseDemandEb: number
  upsideDemandEb: number
  deltaEb: number
  deltaPercent: number
}

const round = (value: number, digits = 4): number => {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function gbToEb(gb: number): number {
  return round(gb / 1_000_000_000, 4)
}

function tbToEb(tb: number): number {
  return round(tb / 1_000_000, 4)
}

export function buildDefaultDomainComparisonRows(): DomainComparisonRow[] {
  const smartphonePreset = getScenarioPreset('mainstream-reference')
  const smartphoneResult = calculateSmartphoneMemoryDemand(smartphonePreset.input)
  const pcPreset = getPcDramScenarioPreset('ai-pc-transition-reference')
  const pcResult = calculatePcDramDemand(pcPreset.input)
  const hbmPreset = getHbmScenarioPreset('hbm3e-12hi-reference')
  const hbmResult = calculateHbmDemand(hbmPreset.input)
  const nandPreset = getNandSsdScenarioPreset('enterprise-transition-ssd-reference')
  const nandResult = calculateNandSsdDemand(nandPreset.input)

  return [
    {
      id: 'smartphone-dram',
      label: 'Smartphone DRAM',
      family: 'DRAM',
      demandBasis: `${smartphonePreset.label}: ${smartphoneResult.weightedAverageDramGb} GB/device`,
      totalDemandEb: gbToEb(smartphoneResult.totalDramGb),
      sourcePreset: smartphonePreset.id,
      note: '3-segment smartphone DRAM content scenario'
    },
    {
      id: 'smartphone-nand',
      label: 'Smartphone NAND',
      family: 'NAND',
      demandBasis: `${smartphonePreset.label}: ${smartphoneResult.weightedAverageNandGb} GB/device`,
      totalDemandEb: gbToEb(smartphoneResult.totalNandGb),
      sourcePreset: smartphonePreset.id,
      note: '3-segment smartphone storage content scenario'
    },
    {
      id: 'pc-dram',
      label: 'PC DRAM',
      family: 'DRAM',
      demandBasis: `${pcPreset.label}: ${pcResult.weightedAverageDramGb} GB/PC`,
      totalDemandEb: pcResult.totalDramEb,
      sourcePreset: pcPreset.id,
      note: 'AI PC penetration scenario'
    },
    {
      id: 'ai-server-hbm',
      label: 'AI Server HBM',
      family: 'HBM',
      demandBasis: `${hbmPreset.label}: ${hbmResult.hbmGbPerAccelerator} GB/accelerator`,
      totalDemandEb: hbmResult.totalHbmEb,
      sourcePreset: hbmPreset.id,
      note: 'AI accelerator attach-rate scenario'
    },
    {
      id: 'nand-ssd',
      label: 'NAND SSD',
      family: 'NAND',
      demandBasis: `${nandPreset.label}: ${nandResult.weightedAverageCapacityTb} TB/SSD`,
      totalDemandEb: nandResult.totalNandEb,
      sourcePreset: nandPreset.id,
      note: 'Client/enterprise/AI storage SSD mix scenario'
    }
  ]
}

export function rankComparisonRowsByDemand(rows: DomainComparisonRow[]): DomainComparisonRow[] {
  return [...rows].sort((a, b) => b.totalDemandEb - a.totalDemandEb)
}

export function buildScenarioDeltaRows(): ScenarioDeltaRow[] {
  const baseRows = buildDefaultDomainComparisonRows()

  const smartphoneUpside = calculateSmartphoneMemoryDemand(getScenarioPreset('premium-reference').input)
  const pcUpside = calculatePcDramDemand(getPcDramScenarioPreset('ai-heavy-pc-reference').input)
  const hbmUpside = calculateHbmDemand(getHbmScenarioPreset('hbm4-12hi-reference').input)
  const nandUpside = calculateNandSsdDemand(getNandSsdScenarioPreset('ai-storage-heavy-ssd-reference').input)

  const upsideById: Record<DomainComparisonId, number> = {
    'smartphone-dram': gbToEb(smartphoneUpside.totalDramGb),
    'smartphone-nand': gbToEb(smartphoneUpside.totalNandGb),
    'pc-dram': pcUpside.totalDramEb,
    'ai-server-hbm': hbmUpside.totalHbmEb,
    'nand-ssd': tbToEb(nandUpside.totalNandTb)
  }

  return baseRows.map((row) => {
    const upsideDemandEb = upsideById[row.id]
    const deltaEb = round(upsideDemandEb - row.totalDemandEb, 4)
    const deltaPercent = row.totalDemandEb === 0 ? 0 : round((deltaEb / row.totalDemandEb) * 100, 2)

    return {
      ...row,
      baseDemandEb: row.totalDemandEb,
      upsideDemandEb,
      deltaEb,
      deltaPercent
    }
  })
}

export function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value)
}

export function formatEb(value: number): string {
  const digits = Math.abs(value) < 1 ? 4 : 2
  return `${formatNumber(value, digits)} EB`
}
