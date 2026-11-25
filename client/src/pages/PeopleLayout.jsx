import { NavLink, Outlet } from 'react-router'

export default function PeopleLayout({ people }) {
  return (
    <div className="people-frame">
      <nav aria-label="People" className="sidebar">
        {people.map((p) => (
          <NavLink
            key={p.id}
            to={`/people/${p.id}`}
            className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
          >
            {p.name}
          </NavLink>
        ))}
      </nav>
      {/* Slide 22 uses <main> here → nests <main> inside Layout's <main>; change to <section> */}
      {/* Put aria-live on a persistent region (not on the skeleton) so the screen reader reads new content */}
      <section className="content-area" aria-label="Person details" aria-live="polite">
        <Outlet />
      </section>
    </div>
  )
}
