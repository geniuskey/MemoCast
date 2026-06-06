import { describe, expect, it } from 'vitest'
import {
  classifyForecastingMethod,
  getForecastingMethodPreset,
  listForecastingMethodPresets,
  scoreForecastingMethods
} from '../wiki/lib/forecastingMethodSelector'

describe('forecasting method selector', () => {
  it('recommends structural VAR/ARIMAX when lead-lag signals and interpretability dominate', () => {
    const preset = getForecastingMethodPreset('structural-var-leading-indicator-reference')
    const result = classifyForecastingMethod(preset.input)

    expect(result.primaryMethod).toBe('structural-var-arimax')
    expect(result.methodScores['structural-var-arimax']).toBeGreaterThan(result.methodScores['diffusion-grey-scenario'])
    expect(result.interpretation).toContain('lead/lag')
  })

  it('recommends bullwhip/inventory models when order amplification is the main distortion', () => {
    const preset = getForecastingMethodPreset('bullwhip-inventory-cycle-reference')
    const result = classifyForecastingMethod(preset.input)

    expect(result.primaryMethod).toBe('bullwhip-inventory-system-dynamics')
    expect(result.methodScores['bullwhip-inventory-system-dynamics']).toBeGreaterThanOrEqual(80)
  })

  it('recommends diffusion/grey/scenario models for small-sample technology transitions', () => {
    const preset = getForecastingMethodPreset('technology-diffusion-small-sample-reference')
    const result = classifyForecastingMethod(preset.input)

    expect(result.primaryMethod).toBe('diffusion-grey-scenario')
    expect(result.methodScores['diffusion-grey-scenario']).toBeGreaterThan(75)
  })

  it('returns defensive copies of source-backed forecasting presets', () => {
    const [firstPreset] = listForecastingMethodPresets()
    firstPreset.input.historyMonths = 999
    firstPreset.recommendedMethods.push('fake')

    const freshPreset = getForecastingMethodPreset(firstPreset.id)
    expect(freshPreset.input.historyMonths).not.toBe(999)
    expect(freshPreset.recommendedMethods).not.toContain('fake')
  })

  it('clamps method scores to a 0-100 range for invalid inputs', () => {
    const scores = scoreForecastingMethods({
      historyMonths: Number.NaN,
      signalCount: 999,
      leadLagKnownScore: 999,
      causalInterpretabilityNeedScore: 999,
      nonlinearPatternScore: 999,
      smallSampleScore: 999,
      inventoryDistortionScore: 999,
      capacityConstraintScore: 999
    })

    expect(Object.values(scores).every((score) => score >= 0 && score <= 100)).toBe(true)
  })
})
