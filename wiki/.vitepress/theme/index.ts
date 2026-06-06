import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CitationWorkQueue from '../../components/CitationWorkQueue.vue'
import DomainComparisonPanel from '../../components/DomainComparisonPanel.vue'
import PeriodDemandChart from '../../components/PeriodDemandChart.vue'
import HbmDemandSimulator from '../../components/HbmDemandSimulator.vue'
import HomePage from '../../components/HomePage.vue'
import KnowledgeGraph from '../../components/KnowledgeGraph.vue'
import NandSsdDemandSimulator from '../../components/NandSsdDemandSimulator.vue'
import PcDramDemandSimulator from '../../components/PcDramDemandSimulator.vue'
import SmartphoneMemoryDemandSimulator from '../../components/SmartphoneMemoryDemandSimulator.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CitationWorkQueue', CitationWorkQueue)
    app.component('DomainComparisonPanel', DomainComparisonPanel)
    app.component('PeriodDemandChart', PeriodDemandChart)
    app.component('HbmDemandSimulator', HbmDemandSimulator)
    app.component('HomePage', HomePage)
    app.component('KnowledgeGraph', KnowledgeGraph)
    app.component('NandSsdDemandSimulator', NandSsdDemandSimulator)
    app.component('PcDramDemandSimulator', PcDramDemandSimulator)
    app.component('SmartphoneMemoryDemandSimulator', SmartphoneMemoryDemandSimulator)
  }
} satisfies Theme
