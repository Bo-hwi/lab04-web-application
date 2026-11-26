export function computeDisproportionalityMatrix(cases) {
  const normalized = cases.map(({ severity, penaltyDays }) => {
    if (severity === '' || penaltyDays === '') return null
    const points = Number(severity)
    const days = Number(penaltyDays)
    return Number.isFinite(points) && points > 0 && Number.isFinite(days) && days >= 0
      ? days / points
      : null
  })
  return normalized.map((value) => normalized.map((reference) => {
    if (value === null || reference === null || reference === 0) return null
    const ratio = value / reference
    return Number.isFinite(ratio) ? ratio : null
  }))
}
