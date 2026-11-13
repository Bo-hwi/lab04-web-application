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
      {/* Slide 22 dùng <main> ở đây → lồng <main> trong <main> của Layout; đổi thành <section> */}
      {/* aria-live đặt trên vùng luôn tồn tại (không đặt trên skeleton) để screen reader đọc nội dung mới */}
      <section className="content-area" aria-label="Person details" aria-live="polite">
        <Outlet />
      </section>
    </div>
  )
}
