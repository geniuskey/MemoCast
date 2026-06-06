import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

function readRepoFile(relativePath: string) {
  return readFileSync(join(repoRoot, relativePath), 'utf8')
}

describe('simulator preset evidence UI', () => {
  it('renders confidence and sourceRefs for preset cards across simulator components', () => {
    const components = [
      'wiki/components/SmartphoneMemoryDemandSimulator.vue',
      'wiki/components/PcDramDemandSimulator.vue',
      'wiki/components/HbmDemandSimulator.vue',
      'wiki/components/NandSsdDemandSimulator.vue'
    ]

    for (const componentPath of components) {
      const component = readRepoFile(componentPath)
      expect(component).toContain('preset.confidence')
      expect(component).toContain('preset.sourceRefs')
      expect(component).toContain('preset-source-row')
      expect(component).toContain('confidence-badge')
    }
  })
})
