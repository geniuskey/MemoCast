<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import graphData from '../public/graph-data.json'

type NodeType = 'source' | 'concept' | 'method' | 'market' | 'simulator' | 'comparison'

type RawGraphNode = {
  id: string
  label: string
  type: NodeType
  href?: string
  tags?: string[]
  sources?: string[]
  confidence?: string
}

type RawGraphEdge = {
  from: string
  to: string
  kind?: string
}

type GraphNode = RawGraphNode & {
  x: number
  y: number
  summary: string
}

type GraphEdge = RawGraphEdge & {
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

const typeLanes: Record<NodeType, number> = {
  source: 90,
  concept: 330,
  method: 540,
  market: 755,
  simulator: 995,
  comparison: 1210
}

const typeOrder: NodeType[] = ['source', 'concept', 'method', 'market', 'simulator', 'comparison']

const rawNodes = graphData.nodes as RawGraphNode[]
const edges = (graphData.edges as RawGraphEdge[]).map((edge) => ({ ...edge, strength: 'secondary' as const })) satisfies GraphEdge[]
const incomingCounts = countEdges(edges, 'to')
const outgoingCounts = countEdges(edges, 'from')

const nodes: GraphNode[] = layoutNodes(rawNodes)
const selectedId = ref(nodes.find((node) => node.id === 'domain-comparison')?.id ?? nodes[0]?.id ?? '')
const hoveredId = ref<string | null>(null)

const nodeById = computed<Record<string, GraphNode>>(() => Object.fromEntries(nodes.map((node) => [node.id, node])))
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
const graphStats = computed(() => `${nodes.length} pages · ${edges.length} wikilinks · generated ${new Date(graphData.generatedAt).toLocaleDateString('ko-KR')}`)

function countEdges(edgeList: RawGraphEdge[], key: 'from' | 'to') {
  const counts = new Map<string, number>()
  for (const edge of edgeList) counts.set(edge[key], (counts.get(edge[key]) ?? 0) + 1)
  return counts
}

function layoutNodes(sourceNodes: RawGraphNode[]): GraphNode[] {
  const grouped = new Map<NodeType, RawGraphNode[]>()
  for (const type of typeOrder) grouped.set(type, [])
  for (const node of sourceNodes) grouped.get(node.type)?.push(node)

  return typeOrder.flatMap((type) => {
    const laneNodes = grouped.get(type) ?? []
    const gap = Math.min(116, 590 / Math.max(1, laneNodes.length))
    const startY = 92 + Math.max(0, (590 - gap * (laneNodes.length - 1)) / 2)
    return laneNodes.map((node, index) => ({
      ...node,
      x: typeLanes[type],
      y: startY + index * gap,
      summary: summarizeNode(node)
    }))
  })
}

function summarizeNode(node: RawGraphNode) {
  const incoming = incomingCounts.get(node.id) ?? 0
  const outgoing = outgoingCounts.get(node.id) ?? 0
  const parts = [
    `${typeLabels[node.type]} page입니다.`,
    `연결: inbound ${incoming}, outbound ${outgoing}.`
  ]
  if (node.confidence) parts.push(`Confidence: ${node.confidence}.`)
  if (node.sources?.length) parts.push(`Source refs: ${node.sources.length}개.`)
  if (node.tags?.length) parts.push(`Tags: ${node.tags.slice(0, 4).join(', ')}${node.tags.length > 4 ? '…' : ''}.`)
  return parts.join(' ')
}

function nodeHref(node: GraphNode) {
  return node.href ? withBase(node.href) : undefined
}

function edgePath(edge: GraphEdge) {
  const from = nodeById.value[edge.from]
  const to = nodeById.value[edge.to]
  if (!from || !to) return ''
  const midX = (from.x + to.x) / 2
  const sameLane = Math.abs(to.x - from.x) < 4
  if (sameLane) {
    const direction = to.y > from.y ? 1 : -1
    const arc = 62
    return `M ${from.x} ${from.y} C ${from.x + arc} ${from.y + 18 * direction}, ${to.x + arc} ${to.y - 18 * direction}, ${to.x} ${to.y}`
  }
  const bend = Math.max(42, Math.abs(to.x - from.x) * 0.26)
  const c1x = midX - bend * 0.35
  const c2x = midX + bend * 0.35
  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`
}

function edgeLabelPosition(edge: GraphEdge) {
  const from = nodeById.value[edge.from]
  const to = nodeById.value[edge.to]
  return {
    x: ((from?.x ?? 0) + (to?.x ?? 0)) / 2,
    y: ((from?.y ?? 0) + (to?.y ?? 0)) / 2 - 8
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
        wiki 문서의 frontmatter와 Obsidian wikilink를 빌드 시점에 파싱해 자동 생성합니다. 노드를 클릭하면 해당 페이지로 이동하고, 마우스를 올리면 연결된 근거·개념·시장·시뮬레이터 경로가 강조됩니다.
      </p>
      <p class="graph-stats">{{ graphStats }}</p>
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

.graph-copy .graph-stats {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 0 11px;
  border: 1px solid rgba(174, 182, 255, 0.24);
  border-radius: 999px;
  color: #aeb6ff;
  background: rgba(174, 182, 255, 0.07);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
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
