import { Fragment, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { useForumMessages } from './useForumMessages.js'
import { CHANNELS } from './channels.js'

const linkClass = ({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')

export default function ForumPage() {
  const { channelId } = useParams()
  const { data, loading, error, postMessage } = useForumMessages(channelId)
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [postError, setPostError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPostError(null)
    try {
      await postMessage({ author, text })
      setText('')
    } catch (err) {
      setPostError(err.message)
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
      <form onSubmit={handleSubmit} aria-label="New message" className="simple-form">
        <label>
          Author
          <input value={author} onChange={(e) => setAuthor(e.target.value)} required maxLength={50} />
        </label>
        <label>
          Message
          <textarea value={text} onChange={(e) => setText(e.target.value)} required maxLength={500} />
        </label>
        <button type="submit">Send</button>
        {postError && <p role="alert">Could not send: {postError}</p>}
      </form>
    </>
  )
}
