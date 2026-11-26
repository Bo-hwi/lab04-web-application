import { useId, useState } from 'react'
import { computeDisproportionalityMatrix } from './computeDisproportionalityMatrix.js'

const DEMO_CASES = [
  { id: 'himass', name: 'Himass', severity: '2', penaltyDays: '10' },
  { id: 'tanvuu', name: 'TanVuu', severity: '4', penaltyDays: '10' },
]

function ComparisonInput({ entry, field, label, min, describedBy, onChange }) {
  const id = useId()
  const numeric = Number(entry[field])
  const invalid = entry[field] !== '' && (!Number.isFinite(numeric) || (field === 'severity' ? numeric <= 0 : numeric < 0))
  return (
    <label htmlFor={id}>
      {entry.name} {label}
      <input id={id} type="number" min={min} step="any" value={entry[field]} aria-invalid={invalid} aria-describedby={describedBy}
        onChange={(event) => onChange(entry.id, field, event.target.value)} />
    </label>
  )
}

export default function DisproportionalityMatrix() {
  const headingId = useId()
  const noteId = useId()
  const helpId = useId()
  const [cases, setCases] = useState(DEMO_CASES)
  const matrix = computeDisproportionalityMatrix(cases)

  function updateCase(id, field, value) {
    setCases((previous) => previous.map((entry) => entry.id === id ? { ...entry, [field]: value } : entry))
  }

  return (
    <section aria-labelledby={headingId} className="comparison">
      <h2 id={headingId}>Disproportionality comparison</h2>
      <p id={noteId}>Hypothetical comparison data for this exercise, not findings about either player.</p>
      <p id={helpId}>Enter severity greater than zero and penalty days zero or above. Each cell compares penalty days per severity point: row value divided by column value. 1 means equal; unavailable inputs show N/A. This calculation does not determine an appeal outcome.</p>
      <div className="comparison-inputs">
        {cases.map((entry) => (
          <fieldset key={entry.id}>
            <legend>{entry.name} demo values</legend>
            {[
              ['severity', 'severity points', '0'],
              ['penaltyDays', 'penalty days', '0'],
            ].map(([field, label, min]) => (
              <ComparisonInput key={field} entry={entry} field={field} label={label} min={min}
                describedBy={`${noteId} ${helpId}`} onChange={updateCase} />
            ))}
          </fieldset>
        ))}
      </div>
      <div className="table-scroll">
        <table>
          <caption>Normalized penalty ratio matrix</caption>
          <thead><tr><th scope="col">Row / column</th>{cases.map((entry) => <th scope="col" key={entry.id}>{entry.name}</th>)}</tr></thead>
          <tbody>{cases.map((entry, index) => (
            <tr key={entry.id}>
              <th scope="row">{entry.name}</th>
              {matrix[index].map((value, column) => <td key={cases[column].id}>{value === null ? 'N/A' : value.toFixed(2)}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  )
}
