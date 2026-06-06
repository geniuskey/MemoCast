import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DomainComparisonPanel from '../../components/DomainComparisonPanel.vue'
import HbmDemandSimulator from '../../components/HbmDemandSimulator.vue'
import HomePage from '../../components/HomePage.vue'
import NandSsdDemandSimulator from '../../components/NandSsdDemandSimulator.vue'
import PcDramDemandSimulator from '../../components/PcDramDemandSimulator.vue'
import SmartphoneMemoryDemandSimulator from '../../components/SmartphoneMemoryDemandSimulator.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DomainComparisonPanel', DomainComparisonPanel)
    app.component('HbmDemandSimulator', HbmDemandSimulator)
    app.component('HomePage', HomePage)
    app.component('NandSsdDemandSimulator', NandSsdDemandSimulator)
    app.component('PcDramDemandSimulator', PcDramDemandSimulator)
    app.component('SmartphoneMemoryDemandSimulator', SmartphoneMemoryDemandSimulator)
  }
} satisfies Theme
