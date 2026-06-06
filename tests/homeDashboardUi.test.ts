import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

function readRepoFile(relativePath: string) {
  return readFileSync(join(repoRoot, relativePath), 'utf8')
}

describe('home dashboard UI', () => {
  it('renders the source-backed dashboard data and required tracking sections on Home', () => {
    const component = readRepoFile('wiki/components/HomePage.vue')

    expect(component).toContain("import dashboard from '../data/home-dashboard.json'")
    expect(component).toContain('수집·추적 상황판')
    expect(component).toContain('raw → wiki 연결 상태')
    expect(component).toContain('최근 업데이트')
    expect(component).toContain('낮은 confidence')
    expect(component).toContain('보강 필요 cluster')
    expect(component).toContain('summary.rawTotal')
    expect(component).toContain('enrichmentClusters')
  })
})
