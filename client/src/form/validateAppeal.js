export function validateAppeal(values) {
  const errors = {}
  const reason = values.appealReason.trim()
  const evidenceUrl = values.evidenceUrl.trim()
  const evidenceDescription = values.evidenceDescription.trim()

  if (reason.length < 20) {
    errors.appealReason = 'Explain the appeal in at least 20 characters.'
  }

  if (evidenceUrl) {
    try {
      const parsedUrl = new URL(evidenceUrl)
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        errors.evidenceUrl = 'Evidence URL must use HTTP or HTTPS.'
      }
    } catch {
      errors.evidenceUrl = 'Enter a valid evidence URL.'
    }
  }

  if (evidenceUrl && !evidenceDescription) {
    errors.evidenceDescription = 'Describe the evidence you linked.'
  } else if (!evidenceUrl && evidenceDescription) {
    errors.evidenceUrl = 'Add the URL for the evidence you described.'
  }

  return errors
}