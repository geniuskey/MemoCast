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
    expect(css).toContain('--mc-wide-layout-offset: max(0px, calc((100vw - var(--vp-layout-max-width)) / 2))')
    expect(css).toContain('--mc-sidebar-reserved-width: calc(var(--mc-sidebar-min-width) + var(--mc-wide-layout-offset))')
    expect(css).toContain('--vp-sidebar-width: var(--mc-sidebar-min-width)')
    expect(css).toContain('.VPSidebar {')
    expect(css).toContain('min-width: var(--mc-sidebar-min-width)')
    expect(css).toContain('width: var(--mc-sidebar-reserved-width) !important')
    expect(css).toContain('.VPContent.has-sidebar {')
    expect(css).toContain('padding-left: var(--mc-sidebar-reserved-width)')
  })

  it('lets the main document width flex between 1400px and 1560px without sitting under the sidebar', () => {
    const css = readRepoFile('wiki/.vitepress/theme/custom.css')

    expect(css).toContain('@media (min-width: 960px) and (max-width: 1560px)')
    expect(css).toContain('max-width: calc(100vw - var(--mc-sidebar-min-width))')
    expect(css).toContain('padding-left: calc(var(--mc-sidebar-min-width) + var(--mc-doc-gutter)) !important')
    expect(css).toContain('max-width: calc(100vw - var(--mc-sidebar-min-width) - (var(--mc-doc-gutter) * 2)) !important')
    expect(css).toContain('margin-left: 0 !important')
    expect(css).toContain('.VPDoc.has-sidebar .aside')
    expect(css).toContain('max-width: min(1480px, 100%) !important')
    expect(css).toContain('max-width: min(1180px, 100%) !important')
  })
})
