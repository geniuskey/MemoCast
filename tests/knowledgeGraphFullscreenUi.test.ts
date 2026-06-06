import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

function readRepoFile(relativePath: string) {
  return readFileSync(join(repoRoot, relativePath), 'utf8')
}

describe('knowledge graph fullscreen UI', () => {
  it('adds a fullscreen toggle around the interactive map', () => {
    const component = readRepoFile('wiki/components/KnowledgeGraph.vue')

    expect(component).toContain('graphShellRef')
    expect(component).toContain('toggleFullscreen')
    expect(component).toContain('requestFullscreen')
    expect(component).toContain('exitFullscreen')
    expect(component).toContain('fullscreenchange')
    expect(component).toContain('전체 화면으로 보기')
    expect(component).toContain('전체 화면 닫기')
    expect(component).toContain('graph-fullscreen-toggle')
    expect(component).toContain('.graph-shell:fullscreen')
  })
})
