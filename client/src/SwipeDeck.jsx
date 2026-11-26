import { useEffect, useRef } from 'react'
import { deriveDeck } from './swipeState.js'
import { useSwipeDeck } from './useSwipeDeck.js'

export default function SwipeDeck() {
  const { profiles, history, loading, pending, error, swipe, undo, reloadDeck } = useSwipeDeck()
  const { remaining, score } = deriveDeck(profiles, history)
  const profile = remaining[0]
  const gesture = useRef(null)
  const deckRef = useRef(null)
  const actionControl = useRef(null)
  const disabled = loading || pending

  useEffect(() => {
    if (disabled || !actionControl.current) return
    const control = actionControl.current
    actionControl.current = null
    if (control.disabled && (document.activeElement === control || document.activeElement === document.body)) deckRef.current?.focus()
  }, [disabled, profile?.id, history.length])

  function perform(event, action) {
    if (disabled) return
    actionControl.current = event.currentTarget
    void action()
  }

  function handleKeyDown(event) {
    if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return
    const direction = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up' }[event.key]
    if (!direction && event.key !== 'Backspace') return
    event.preventDefault()
    if (disabled || event.repeat) return
    if (event.key === 'Backspace') void undo()
    else if (profile) void swipe(profile.id, direction)
  }

  function handlePointerDown(event) {
    if (disabled || event.button !== 0 || event.isPrimary === false) return
    gesture.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId, profileId: profile.id }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  function handlePointerUp(event) {
    const start = gesture.current
    gesture.current = null
    if (!start || disabled || !profile || profile.id !== start.profileId || event.pointerId !== start.pointerId) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) >= 50 && Math.abs(dx) >= Math.abs(dy)) void swipe(profile.id, dx > 0 ? 'right' : 'left')
    else if (dy <= -50 && Math.abs(dy) > Math.abs(dx)) void swipe(profile.id, 'up')
  }

  return (
    <main>
      <header className="intro">
        <p className="eyebrow">Lab 4 / Interactive swipe deck</p>
        <h1>Hen Ho Nhung Khong Yeu</h1>
        <p>A small game about first impressions. All profiles are fictional.</p>
      </header>
      <section ref={deckRef} role="group" aria-label="Swipe deck" aria-describedby="deck-help" tabIndex={0} onKeyDown={handleKeyDown} className="deck">
        <div className="deck-meta">
          <p><output aria-label="Score">{score}</output> points</p>
          <p>{remaining.length} of {profiles.length} cards remaining</p>
        </div>
        <p id="deck-help">Swipe left to pass, right to like, or up to super like. You can also use the buttons, arrow keys, and Backspace to undo while this deck has focus.</p>
        <div className="card-slot" aria-busy={disabled}>
          {loading ? <p>Loading saved deck...</p> : profile ? (
            <article aria-label="Current profile" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}
              onPointerCancel={() => { gesture.current = null }} onLostPointerCapture={() => { gesture.current = null }} className="profile-card">
              <p className="profile-number">Profile {profiles.indexOf(profile) + 1}</p>
              <h2>{profile.name}, {profile.age}</h2>
              <p>{profile.bio}</p>
              <p className="card-hint">Take your time. Your next choice is yours.</p>
            </article>
          ) : !error ? <div className="empty"><h2>All caught up</h2><p>Undo a choice to see that profile again.</p></div> : null}
        </div>
        <div className="actions" role="group" aria-label="Profile actions">
          <button type="button" disabled={!profile} aria-disabled={disabled || undefined} onClick={(event) => perform(event, () => swipe(profile.id, 'left'))}>Pass (-5)</button>
          <button type="button" disabled={!profile} aria-disabled={disabled || undefined} onClick={(event) => perform(event, () => swipe(profile.id, 'right'))}>Like (+10)</button>
          <button type="button" disabled={!profile} aria-disabled={disabled || undefined} onClick={(event) => perform(event, () => swipe(profile.id, 'up'))}>Super like (+20)</button>
        </div>
        <div className="secondary-actions">
          <button type="button" disabled={history.length === 0} aria-disabled={disabled || undefined} onClick={(event) => perform(event, undo)}>Undo last swipe</button>
          <button type="button" aria-disabled={disabled || undefined} onClick={(event) => perform(event, reloadDeck)}>Reload saved deck</button>
        </div>
        <p role="status" aria-atomic="true" className="save-status">{pending ? 'Saving your choice...' : loading ? 'Loading saved deck...' : `${history.length} saved choices. Score ${score}.`}</p>
        {error && <p role="alert">Could not update the deck: {error}</p>}
      </section>
      <footer><p>Pass -5 / Like +10 / Super like +20. Undo reverses the latest score change.</p></footer>
    </main>
  )
}
