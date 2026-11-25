// Never render passwords in the inspector
const HIDDEN_KEYS = new Set(['password', 'confirmPassword'])

export default function ShowData({ data }) {
  return (
    <section aria-label="Submitted data" className="json-inspector">
      <h2>Submitted data</h2>
      {/* <dl>/<dt>/<dd> instead of JSON.stringify: screen readers read key-value pairs */}
      <dl>
        {Object.entries(data)
          .filter(([key]) => !HIDDEN_KEYS.has(key))
          .map(([key, val]) => (
            <div key={key} className="data-row">
              <dt>{key}</dt>
              <dd>{String(val)}</dd>
            </div>
          ))}
      </dl>
    </section>
  )
}
