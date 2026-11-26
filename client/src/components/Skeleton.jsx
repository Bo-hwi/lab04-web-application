// Reserve loading space; measure CLS in a browser before claiming a score.
export default function Skeleton() {
  return (
    <div className="skeleton" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Đang tải…</span>
      <div className="skeleton-line" />
      <div className="skeleton-line" />
    </div>
  )
}