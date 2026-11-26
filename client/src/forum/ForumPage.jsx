import { Fragment, useId, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { useForumMessages } from './useForumMessages.js'
import { validateMessage } from '../../../server/src/validateMessage.js'
import { CHANNELS } from './channels.js'

const linkClass = ({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')

export default function ForumPage() {
  const { channelId } = useParams()
  return <ForumChannel key={channelId} channelId={channelId} />
}

function ForumChannel({ channelId }) {
  const { data, loading, error, postMessage } = useForumMessages(channelId)
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [postError, setPostError] = useState(null)

  const authorId = useId()
  const textId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const errors = validateMessage({ author, text })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPostError(null)
    setSubmitted(true)
    if (Object.keys(errors).length || sending) return
    setSending(true)
    try {
      await postMessage({ author: author.trim(), text: text.trim() })
      setText('')
      setSubmitted(false)
    } catch (err) {
      if (err.name !== 'AbortError') setPostError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <h1>Forum</h1>
      <nav aria-label="Channels" className="main-nav">
        {CHANNELS.map((c) => (
          <NavLink key={c} to={`/forum/${c}`} className={linkClass}>
            #{c}
          </NavLink>
        ))}
      </nav>

      <section aria-label="Messages" aria-busy={loading} aria-live="polite" className="messages">
        {error && <p role="alert">Could not load messages: {error}</p>}
        {loading ? (
          <p>Loading…</p>
        ) : (
          // Keyed <Fragment> inside <dl> (slide 16): dt = author, dd = text
          <dl className="message-list">
            {data.map((m) => (
              <Fragment key={m.id}>
                <dt>{m.author}</dt>
                <dd>{m.text}</dd>
              </Fragment>
            ))}
          </dl>
        )}
      </section>

      {/* Same limits as server/src/validateMessage.js (client/server validation parity) */}
      <form onSubmit={handleSubmit} noValidate aria-label="New message" className="simple-form">
        <label htmlFor={authorId}>
          Author
          <input id={authorId} value={author} onChange={(e) => setAuthor(e.target.value)} required aria-invalid={submitted && Boolean(errors.author)} aria-describedby={submitted && errors.author ? `${authorId}-error` : undefined} />
        </label>
        {submitted && errors.author && <p id={`${authorId}-error`} role="alert">{errors.author}</p>}
        <label htmlFor={textId}>
          Message
          <textarea id={textId} value={text} onChange={(e) => setText(e.target.value)} required aria-invalid={submitted && Boolean(errors.text)} aria-describedby={submitted && errors.text ? `${textId}-error` : undefined} />
        </label>
        {submitted && errors.text && <p id={`${textId}-error`} role="alert">{errors.text}</p>}
        <button type="submit" disabled={sending}>Send</button>
        {postError && <p role="alert">Could not send: {postError}</p>}
      </form>
    </>
  )
}
