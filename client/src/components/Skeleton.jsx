// Placeholder the same size as the detail <dl> → no layout shift (CLS = 0)
export default function Skeleton() {
  return (
    <div className="skeleton" aria-busy="true">
      <span className="visually-hidden">Đang tải…</span>
      <div className="skeleton-line" />
      <div className="skeleton-line" />
    </div>
  )
}