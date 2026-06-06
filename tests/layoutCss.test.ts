import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

function readRepoFile(relativePath: string) {
  return readFileSync(join(repoRoot, relativePath), 'utf8')
}

describe('VitePress layout CSS', () => {
  it('keeps the desktop sidebar from collapsing below the readable minimum width', () => {
    const css = readRepoFile('wiki/.vitepress/theme/custom.css')

    expect(css).toContain('--mc-sidebar-min-width: 272px')
    expect(css).toContain('--vp-sidebar-width: var(--mc-sidebar-min-width)')
    expect(css).toContain('.VPSidebar {')
    expect(css).toContain('min-width: var(--mc-sidebar-min-width)')
    expect(css).toContain('.VPContent.has-sidebar {')
    expect(css).toContain('padding-left: var(--mc-sidebar-min-width)')
  })
})
