import { useParams } from 'react-router'

export default function PersonDetail({ people }) {
  // useParams() always returns a string, even when the URL is /people/1
  const { id } = useParams()
  const person = people.find((p) => String(p.id) === id)

  if (!person) {
    return <div role="alert">404: Person Not Found</div>
  }

  return (
    <dl className="person-details">
      <dt>Name</dt>
      <dd>{person.name}</dd>
      <dt>Role</dt>
      <dd>{person.role}</dd>
    </dl>
  )
}