<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

type NodeType = 'source' | 'concept' | 'method' | 'market' | 'simulator' | 'comparison'

type GraphNode = {
  id: string
  label: string
  type: NodeType
  x: number
  y: number
  href?: string
  summary: string
}

type GraphEdge = {
  from: string
  to: string
  label?: string
  strength?: 'primary' | 'secondary'
}

const typeLabels: Record<NodeType, string> = {
  source: 'Raw evidence',
  concept: 'Concept',
  method: 'Method',
  market: 'Market',
  simulator: 'Simulator',
  comparison: 'Comparison'
}

const nodes: GraphNode[] = [
  { id: 'raw', label: 'Raw sources', type: 'source', x: 80, y: 270, href: '/sources/raw-source-map', summary: '196개 raw 자료를 cluster별로 묶고 source URL과 citation anchor를 추적합니다.' },
  { id: 'citation', label: 'Citation matrix', type: 'source', x: 190, y: 135, href: '/sources/citation-matrix', summary: 'wiki page와 simulator preset이 어떤 raw source를 인용하는지 확인하는 evidence audit 표입니다.' },

  { id: 'forecast', label: 'Demand forecasting', type: 'concept', x: 330, y: 90, href: '/concepts/demand-forecasting', summary: '메모리 수요 예측 문제를 unit, bit, capacity, revenue 관점으로 정의합니다.' },
  { id: 'memory', label: 'Memory demand', type: 'concept', x: 345, y: 215, href: '/concepts/memory-demand', summary: '수요를 측정하는 관점과 단위를 정리하는 핵심 개념 노드입니다.' },
  { id: 'bit', label: 'Bit demand', type: 'concept', x: 345, y: 345, href: '/concepts/bit-demand', summary: '출하량과 평균 content를 bit 단위 수요로 변환하는 공통 언어입니다.' },
  { id: 'gap', label: 'Supply-demand gap', type: 'concept', x: 330, y: 475, href: '/concepts/supply-demand-gap', summary: 'bit demand와 bit supply 성장률 차이가 가격/매출/shortage에 미치는 영향을 해석합니다.' },

  { id: 'structural', label: 'Structural model', type: 'method', x: 545, y: 170, href: '/methods/structural-demand-model', summary: '출하량 × 탑재량 × attach rate 방식의 구조적 수요 모델입니다.' },
  { id: 'sensitivity', label: 'Sensitivity', type: 'method', x: 540, y: 330, href: '/methods/sensitivity-analysis', summary: '입력 가정 변화가 EB/PB/TB 결과에 미치는 영향을 비교합니다.' },
  { id: 'evidence', label: 'Evidence map', type: 'method', x: 530, y: 485, href: '/methods/forecasting-evidence-map', summary: 'papers, datasets, lectures를 forecasting 방법론 계층에 매핑합니다.' },

  { id: 'dram', label: 'DRAM', type: 'market', x: 745, y: 110, href: '/markets/dram', summary: 'PC, 스마트폰, 서버, HBM 등에서 발생하는 DRAM bit demand와 공급 제약을 추적합니다.' },
  { id: 'pc', label: 'PC DRAM', type: 'market', x: 760, y: 230, href: '/markets/pc-dram', summary: 'AI PC penetration과 16GB+ baseline이 PC DRAM content를 어떻게 끌어올리는지 봅니다.' },
  { id: 'phone', label: 'Smartphone', type: 'market', x: 760, y: 355, href: '/markets/smartphone-memory', summary: 'entry/mainstream/premium segment별 DRAM·NAND 평균 탑재량을 추적합니다.' },
  { id: 'hbm', label: 'HBM', type: 'market', x: 745, y: 485, href: '/markets/hbm', summary: 'AI accelerator shipment, HBM generation mix, CoWoS/power bottleneck을 연결합니다.' },
  { id: 'nand', label: 'NAND', type: 'market', x: 735, y: 610, href: '/markets/nand', summary: 'client SSD, enterprise SSD, AI storage mix 변화가 NAND bit demand를 만드는 경로입니다.' },

  { id: 'pcSim', label: 'PC DRAM sim', type: 'simulator', x: 980, y: 185, href: '/simulators/pc-dram-demand', summary: 'PC 출하량, AI PC penetration, PC별 DRAM content를 조정합니다.' },
  { id: 'phoneSim', label: 'Phone sim', type: 'simulator', x: 1000, y: 320, href: '/simulators/smartphone-memory-demand', summary: '스마트폰 3개 segment의 평균 DRAM/NAND 탑재량으로 수요를 계산합니다.' },
  { id: 'hbmSim', label: 'HBM sim', type: 'simulator', x: 985, y: 455, href: '/simulators/hbm-demand', summary: 'AI accelerator, attach rate, stack 수, stack capacity로 HBM 수요를 계산합니다.' },
  { id: 'nandSim', label: 'NAND SSD sim', type: 'simulator', x: 985, y: 590, href: '/simulators/nand-ssd-demand', summary: 'Client/Enterprise/AI storage SSD mix와 평균 TB/SSD로 NAND 수요를 계산합니다.' },

  { id: 'comparison', label: 'Domain comparison', type: 'comparison', x: 1210, y: 385, href: '/comparisons/domain-comparison', summary: 'Smartphone, PC, HBM, NAND SSD simulator preset을 EB 단위로 비교합니다.' }
]

const edges: GraphEdge[] = [
  { from: 'raw', to: 'citation', label: 'audit', strength: 'secondary' },
  { from: 'raw', to: 'forecast', label: 'evidence' },
  { from: 'raw', to: 'evidence', label: 'papers / datasets' },
  { from: 'citation', to: 'evidence', label: 'trace' },

  { from: 'forecast', to: 'memory' },
  { from: 'memory', to: 'bit' },
  { from: 'bit', to: 'gap' },
  { from: 'forecast', to: 'structural' },
  { from: 'forecast', to: 'sensitivity' },
  { from: 'gap', to: 'evidence', strength: 'secondary' },

  { from: 'structural', to: 'dram' },
  { from: 'structural', to: 'nand' },
  { from: 'sensitivity', to: 'pcSim' },
  { from: 'sensitivity', to: 'phoneSim' },
  { from: 'sensitivity', to: 'hbmSim' },
  { from: 'sensitivity', to: 'nandSim' },
  { from: 'evidence', to: 'dram', strength: 'secondary' },
  { from: 'evidence', to: 'hbm', strength: 'secondary' },

  { from: 'dram', to: 'pc' },
  { from: 'dram', to: 'phone' },
  { from: 'dram', to: 'hbm' },
  { from: 'nand', to: 'phone' },
  { from: 'pc', to: 'pcSim' },
  { from: 'phone', to: 'phoneSim' },
  { from: 'hbm', to: 'hbmSim' },
  { from: 'nand', to: 'nandSim' },

  { from: 'pcSim', to: 'comparison' },
  { from: 'phoneSim', to: 'comparison' },
  { from: 'hbmSim', to: 'comparison' },
  { from: 'nandSim', to: 'comparison' }
]

const selectedId = ref('comparison')
const hoveredId = ref<string | null>(null)

const nodeById = computed(() => Object.fromEntries(nodes.map((node) => [node.id, node])))
const selectedNode = computed(() => nodeById.value[selectedId.value] ?? nodes[0])
const activeId = computed(() => hoveredId.value ?? selectedId.value)
const activeNeighborIds = computed(() => {
  const active = activeId.value
  const related = new Set<string>([active])
  for (const edge of edges) {
    if (edge.from === active) related.add(edge.to)
    if (edge.to === active) related.add(edge.from)
  }
  return related
})

function nodeHref(node: GraphNode) {
  return node.href ? withBase(node.href) : undefined
}

function edgePath(edge: GraphEdge) {
  const from = nodeById.value[edge.from]
  const to = nodeById.value[edge.to]
  const midX = (from.x + to.x) / 2
  const bend = Math.max(42, Math.abs(to.x - from.x) * 0.28)
  const c1x = midX - bend * 0.35
  const c2x = midX + bend * 0.35
  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`
}

function edgeLabelPosition(edge: GraphEdge) {
  const from = nodeById.value[edge.from]
  const to = nodeById.value[edge.to]
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 - 8
  }
}

function isActiveNode(node: GraphNode) {
  return activeNeighborIds.value.has(node.id)
}

function isActiveEdge(edge: GraphEdge) {
  return edge.from === activeId.value || edge.to === activeId.value
}
</script>

<template>
  <section class="knowledge-graph-card">
    <div class="graph-copy">
      <p class="graph-kicker">Interactive map</p>
      <h2>raw evidence에서 simulator까지 이어지는 MemoCast 지식 흐름</h2>
      <p>
        노드를 클릭하면 해당 페이지로 이동하고, 마우스를 올리면 연결된 근거·개념·시장·시뮬레이터 경로가 강조됩니다.
      </p>
    </div>

    <div class="graph-shell">
      <div class="graph-stage" role="img" aria-label="MemoCast knowledge graph visualization">
        <svg viewBox="0 0 1280 700" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
            <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.44 0 0 0 0 0.44 0 0 0 0 1 0 0 0 0.5 0" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g class="graph-lanes">
            <text x="80" y="42">Evidence</text>
            <text x="330" y="42">Concepts</text>
            <text x="530" y="42">Methods</text>
            <text x="745" y="42">Markets</text>
            <text x="980" y="42">Simulators</text>
            <text x="1210" y="42">Compare</text>
          </g>

          <g class="graph-edges">
            <path
              v-for="edge in edges"
              :key="`${edge.from}-${edge.to}`"
              :d="edgePath(edge)"
              :class="[
                edge.strength === 'secondary' ? 'is-secondary' : 'is-primary',
                isActiveEdge(edge) ? 'is-active' : '',
                activeNeighborIds.has(edge.from) || activeNeighborIds.has(edge.to) ? 'is-neighbor' : ''
              ]"
              marker-end="url(#arrow)"
            />
            <text
              v-for="edge in edges.filter((item) => item.label)"
              :key="`label-${edge.from}-${edge.to}`"
              class="edge-label"
              :class="{ 'is-active': isActiveEdge(edge) }"
              :x="edgeLabelPosition(edge).x"
              :y="edgeLabelPosition(edge).y"
            >{{ edge.label }}</text>
          </g>

          <g class="graph-nodes">
            <a
              v-for="node in nodes"
              :key="node.id"
              :href="nodeHref(node)"
              :class="['graph-node-link', `type-${node.type}`]"
              @mouseenter="hoveredId = node.id"
              @mouseleave="hoveredId = null"
              @focus="hoveredId = node.id"
              @blur="hoveredId = null"
              @click="selectedId = node.id"
            >
              <g :class="['graph-node', isActiveNode(node) ? 'is-active' : 'is-muted', selectedId === node.id ? 'is-selected' : '']" :transform="`translate(${node.x}, ${node.y})`">
                <circle r="31" />
                <text text-anchor="middle" y="-4">{{ node.label }}</text>
                <text class="node-type" text-anchor="middle" y="16">{{ typeLabels[node.type] }}</text>
              </g>
            </a>
          </g>
        </svg>
      </div>

      <aside class="graph-detail">
        <span :class="['detail-pill', `type-${selectedNode.type}`]">{{ typeLabels[selectedNode.type] }}</span>
        <h3>{{ selectedNode.label }}</h3>
        <p>{{ selectedNode.summary }}</p>
        <a v-if="selectedNode.href" :href="nodeHref(selectedNode)">관련 페이지 열기 →</a>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.knowledge-graph-card {
  margin: 28px 0 36px;
  padding: clamp(18px, 3vw, 30px);
  border: 1px solid rgba(113, 112, 255, 0.22);
  border-radius: 28px;
  color: #f7f8f8;
  background:
    radial-gradient(circle at 16% 0%, rgba(113, 112, 255, 0.24), transparent 34%),
    radial-gradient(circle at 88% 14%, rgba(37, 99, 235, 0.16), transparent 30%),
    linear-gradient(180deg, #11122b 0%, #08090a 100%);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.32);
}

.graph-copy {
  max-width: 860px;
  margin-bottom: 22px;
}

.graph-kicker {
  margin: 0 0 10px;
  color: #aeb6ff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.graph-copy h2 {
  margin: 0;
  color: #f7f8f8;
  font-size: clamp(26px, 4vw, 42px);
  line-height: 1.08;
  letter-spacing: -0.045em;
  word-break: keep-all;
}

.graph-copy p:not(.graph-kicker) {
  margin: 14px 0 0;
  color: #c5ccdc;
  font-size: 15px;
  line-height: 1.65;
}

.graph-shell {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  align-items: stretch;
}

.graph-stage,
.graph-detail {
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.035);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.graph-stage {
  min-height: 360px;
  overflow: hidden;
}

.graph-stage svg {
  display: block;
  width: 100%;
  height: auto;
}

.graph-lanes text {
  fill: #8992aa;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-anchor: middle;
  text-transform: uppercase;
}

.graph-edges {
  color: rgba(174, 182, 255, 0.42);
}

.graph-edges path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  opacity: 0.35;
  transition: opacity 160ms ease, stroke-width 160ms ease, color 160ms ease;
}

.graph-edges path.is-secondary {
  stroke-dasharray: 6 8;
}

.graph-edges path.is-neighbor {
  opacity: 0.58;
}

.graph-edges path.is-active {
  color: #a78bfa;
  stroke-width: 4;
  opacity: 1;
}

.edge-label {
  fill: #aeb6ff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  opacity: 0.38;
  text-anchor: middle;
  text-transform: uppercase;
  transition: opacity 160ms ease;
}

.edge-label.is-active {
  opacity: 1;
}

.graph-node-link {
  outline: none;
  text-decoration: none;
}

.graph-node circle {
  fill: #151728;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 2;
  transition: r 160ms ease, fill 160ms ease, stroke 160ms ease, opacity 160ms ease;
}

.graph-node text {
  pointer-events: none;
  fill: #f7f8f8;
  font-size: 13px;
  font-weight: 850;
  letter-spacing: -0.02em;
}

.graph-node .node-type {
  fill: #9aa3b2;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.graph-node.is-muted {
  opacity: 0.38;
}

.graph-node.is-active {
  opacity: 1;
}

.graph-node.is-active circle,
.graph-node.is-selected circle {
  r: 38;
  filter: url(#nodeGlow);
  stroke: rgba(255, 255, 255, 0.72);
}

.type-source .graph-node circle,
.detail-pill.type-source { background: #164e63; fill: #164e63; }
.type-concept .graph-node circle,
.detail-pill.type-concept { background: #3730a3; fill: #3730a3; }
.type-method .graph-node circle,
.detail-pill.type-method { background: #1d4ed8; fill: #1d4ed8; }
.type-market .graph-node circle,
.detail-pill.type-market { background: #7c3aed; fill: #7c3aed; }
.type-simulator .graph-node circle,
.detail-pill.type-simulator { background: #be185d; fill: #be185d; }
.type-comparison .graph-node circle,
.detail-pill.type-comparison { background: #059669; fill: #059669; }

.graph-detail {
  padding: 22px;
}

.detail-pill {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  color: white;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.graph-detail h3 {
  margin: 18px 0 10px;
  color: #f7f8f8;
  font-size: 24px;
  line-height: 1.12;
  letter-spacing: -0.04em;
}

.graph-detail p {
  color: #c5ccdc;
  font-size: 14px;
  line-height: 1.65;
}

.graph-detail a {
  display: inline-flex;
  margin-top: 12px;
  color: #aeb6ff;
  font-weight: 800;
  text-decoration: none;
}

.graph-detail a:hover {
  color: #ffffff;
}

@media (max-width: 960px) {
  .graph-shell {
    grid-template-columns: 1fr;
  }

  .graph-stage {
    min-height: 360px;
  }
}
</style>
