import { describe, expect, it } from 'vitest'
import { buildDatasetCharts, parseCsv } from '../tools/datasetCharts.mjs'

describe('dataset chart generation', () => {
  it('parses quoted CSV rows into objects', () => {
    const rows = parseCsv('year,name,note\n2026,DRAM,"AI, HBM cycle"\n')
    expect(rows).toEqual([{ year: '2026', name: 'DRAM', note: 'AI, HBM cycle' }])
  })

  it('builds chart-ready datasets for bit growth, revenue cycle, and financials', () => {
    const charts = buildDatasetCharts({
      'bit-demand-supply-growth.csv': 'year,memory_type,metric,growth_percent,notes\n2022,DRAM,bit_supply_growth,18.6,n\n2022,DRAM,bit_demand_growth,17.1,n\n',
      'dram-revenue-cycle-history.csv': 'year,dram_revenue_usd_b,yoy_pct,cycle_phase,confidence,source_note\n2024,103.17,115,recovery,medium,n\n',
      'memory-makers-quarterly-financials-cycle.csv': 'company,period,revenue,revenue_unit,operating_profit,profit_unit,note,confidence\nmicron,FY2024,25.11,usd_b,1.522,usd_b,n,high\n'
    })

    expect(charts.bitGrowth[0]).toEqual({ year: 2022, memoryType: 'DRAM', metric: 'bit_supply_growth', growthPercent: 18.6, notes: 'n' })
    expect(charts.revenueCycle[0]).toEqual(expect.objectContaining({ year: 2024, dramRevenueUsdB: 103.17, yoyPct: 115, cyclePhase: 'recovery' }))
    expect(charts.financials[0]).toEqual(expect.objectContaining({ company: 'micron', period: 'FY2024', revenue: 25.11, operatingProfit: 1.522 }))
    expect(charts.summary.datasetCount).toBe(3)
  })

  it('builds period demand timeline rows from referenced shipment and content datasets', () => {
    const charts = buildDatasetCharts({
      'bit-demand-supply-growth.csv': 'year,memory_type,metric,growth_percent,notes\n',
      'dram-revenue-cycle-history.csv': 'year,dram_revenue_usd_b,yoy_pct,cycle_phase,confidence,source_note\n',
      'memory-makers-quarterly-financials-cycle.csv': 'company,period,revenue,revenue_unit,operating_profit,profit_unit,note,confidence\n',
      'smartphone-shipments.csv': 'year,shipments_million_units,yoy_percent,source_note\n2024,1240,6.4,IDC confirmed\n',
      'memory-content-per-device.csv': 'year,device,memory_type,avg_capacity_gb,content_growth_yoy_percent,notes\n2024,smartphone,DRAM,9.0,14.1,TrendForce content\n2024,server,DRAM,600,17.3,TrendForce server content\n',
      'pc-server-shipments.csv': 'year,category,shipments_million_units,yoy_percent,source,notes\n2024,server,13.654,2.05,TrendForce,AI servers\n',
      'gpu-hbm-capacity.csv': 'gpu_model,vendor,architecture,launch_year,hbm_type,hbm_capacity_gb,notes\nB200,NVIDIA,Blackwell,2024,HBM3e,192,per-GPU 192GB\n'
    })

    expect(charts.periodDemandTimeline).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ year: 2024, segment: 'Smartphone DRAM', memoryType: 'DRAM', demandEb: 0.0112, confidence: 'medium' }),
        expect.objectContaining({ year: 2024, segment: 'Server DRAM', memoryType: 'DRAM', demandEb: 0.0082, confidence: 'medium' }),
        expect.objectContaining({ year: 2024, segment: 'AI GPU HBM content', memoryType: 'HBM', demandGbPerUnit: 192, confidence: 'high' })
      ])
    )
    expect(charts.periodDemandTimeline[0].sourceRefs.length).toBeGreaterThan(0)
  })
})
