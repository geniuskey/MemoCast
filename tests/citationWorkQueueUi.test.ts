import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

function readRepoFile(relativePath: string) {
  return readFileSync(join(repoRoot, relativePath), 'utf8')
}

describe('citation work queue UI', () => {
  it('mounts a source-backed raw integration queue on the citation matrix page', () => {
    const component = readRepoFile('wiki/components/CitationWorkQueue.vue')
    const theme = readRepoFile('wiki/.vitepress/theme/index.ts')
    const page = readRepoFile('wiki/sources/citation-matrix.md')

    expect(component).toContain('citation-audit.json')
    expect(component).toContain('priorityUncitedRawFiles')
    expect(component).toContain('미연결 raw를 wiki 지식으로 연결하는 다음 작업 목록')
    expect(component).toContain('추천 연결 page')
    expect(component).toContain('wikiHref')
    expect(theme).toContain("import CitationWorkQueue from '../../components/CitationWorkQueue.vue'")
    expect(theme).toContain("app.component('CitationWorkQueue', CitationWorkQueue)")
    expect(page).toContain('<CitationWorkQueue />')
  })
})
