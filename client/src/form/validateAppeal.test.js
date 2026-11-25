import { describe, expect, it } from 'vitest'
import { validateAppeal } from './validateAppeal.js'

describe('appeal form validation', () => {
  it('accepts a valid appeal without optional evidence', () => {
    expect(
      validateAppeal({
        appealReason: 'The replay shows that the reported action was accidental.',
        evidenceUrl: '',
        evidenceDescription: '',
      }),
    ).toEqual({})
  })

  it('requires a sufficiently detailed appeal reason', () => {
    expect(
      validateAppeal({
        appealReason: 'Too short',
        evidenceUrl: '',
        evidenceDescription: '',
      }),
    ).toHaveProperty('appealReason')
  })

  it('rejects an invalid evidence URL', () => {
    expect(
      validateAppeal({
        appealReason: 'The replay shows that the reported action was accidental.',
        evidenceUrl: 'not-a-url',
        evidenceDescription: 'Match replay',
      }),
    ).toHaveProperty('evidenceUrl')
  })

  it('requires a description when an evidence URL is supplied', () => {
    expect(
      validateAppeal({
        appealReason: 'The replay shows that the reported action was accidental.',
        evidenceUrl: 'https://example.com/replay',
        evidenceDescription: '',
      }),
    ).toHaveProperty('evidenceDescription')
  })

  it('requires a URL when an evidence description is supplied', () => {
    expect(
      validateAppeal({
        appealReason: 'The replay shows that the reported action was accidental.',
        evidenceUrl: '',
        evidenceDescription: 'Match replay',
      }),
    ).toHaveProperty('evidenceUrl')
  })
})