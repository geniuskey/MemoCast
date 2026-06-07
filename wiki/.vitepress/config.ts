import { defineConfig } from 'vitepress'

const base = process.env.GITHUB_ACTIONS ? '/MemoCast/' : '/'

export default defineConfig({
  title: 'MemoCast',
  description: 'Memory Demand Forecasting Knowledge Base and Scenario Simulators',
  base,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }]
  ],
  cleanUrls: true,
  ignoreDeadLinks: [/^\[\[/],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Concepts', link: '/concepts/demand-forecasting' },
      { text: 'Markets', link: '/markets/dram' },
      { text: 'Methods', link: '/methods/structural-demand-model' },
      { text: 'Simulators', link: '/simulators/' },
      { text: 'Charts', link: '/charts' },
      { text: 'Graph', link: '/graph' }
    ],
    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Index', link: '/' },
          { text: 'Charts', link: '/charts' },
          { text: 'Schema', link: '/SCHEMA' },
          { text: 'Log', link: '/log' },
          { text: 'Knowledge Graph', link: '/graph' }
        ]
      },
      {
        text: 'Concepts',
        items: [
          { text: 'Demand Forecasting', link: '/concepts/demand-forecasting' },
          { text: 'Memory Demand', link: '/concepts/memory-demand' },
          { text: 'Bit Demand', link: '/concepts/bit-demand' },
          { text: 'Supply-Demand Gap', link: '/concepts/supply-demand-gap' },
          { text: 'AI Infrastructure Memory', link: '/concepts/ai-infrastructure-memory' },
          { text: 'Channel Pricing Signal', link: '/concepts/channel-pricing-signal' },
          { text: 'Supply Chain & Equipment', link: '/concepts/memory-supply-chain-equipment' },
          { text: 'Long-tail Domain Demand', link: '/concepts/long-tail-domain-demand' },
          { text: 'Forecasting Method Library', link: '/concepts/forecasting-method-library' },
          { text: 'Scenario Analysis', link: '/concepts/scenario-analysis' }
        ]
      },
      {
        text: 'Markets',
        items: [
          { text: 'DRAM', link: '/markets/dram' },
          { text: 'PC DRAM', link: '/markets/pc-dram' },
          { text: 'NAND', link: '/markets/nand' },
          { text: 'HBM', link: '/markets/hbm' },
          { text: 'Smartphone Memory', link: '/markets/smartphone-memory' }
        ]
      },
      {
        text: 'Methods',
        items: [
          { text: 'Structural Demand Model', link: '/methods/structural-demand-model' },
          { text: 'Advanced Forecast Engine', link: '/methods/advanced-demand-forecast-engine' },
          { text: 'Sensitivity Analysis', link: '/methods/sensitivity-analysis' },
          { text: 'Forecasting Evidence Map', link: '/methods/forecasting-evidence-map' }
        ]
      },
      {
        text: 'Sources',
        items: [
          { text: 'Raw Source Map', link: '/sources/raw-source-map' },
          { text: 'Raw Integration Ledger', link: '/sources/raw-integration-ledger' },
          { text: 'Dataset CSV Ledger', link: '/sources/raw-dataset-csv-ledger' },
          { text: 'Citation Matrix', link: '/sources/citation-matrix' }
        ]
      },
      {
        text: 'Comparisons',
        items: [
          { text: 'Domain Comparison', link: '/comparisons/domain-comparison' }
        ]
      },
      {
        text: 'Simulators',
        items: [
          { text: 'Simulator Overview', link: '/simulators/' },
          { text: 'Advanced Forecast', link: '/simulators/advanced-demand-forecast' },
          { text: 'AI Server HBM Demand', link: '/simulators/hbm-demand' },
          { text: 'NAND SSD Demand', link: '/simulators/nand-ssd-demand' },
          { text: 'PC DRAM Demand', link: '/simulators/pc-dram-demand' },
          { text: 'Smartphone Memory Demand', link: '/simulators/smartphone-memory-demand' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: []
  }
})
