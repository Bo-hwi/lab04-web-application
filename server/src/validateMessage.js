// Validation rules for a message payload (same rules are used by the client form)
export function validateMessage(body) {
  const errors = {}
  const author = typeof body?.author === 'string' ? body.author.trim() : ''
  const text = typeof body?.text === 'string' ? body.text.trim() : ''

  if (author.length < 1 || author.length > 50) errors.author = 'Author: 1–50 characters'
  if (text.length < 1 || text.length > 500) errors.text = 'Text: 1–500 characters'

  return errors
}
