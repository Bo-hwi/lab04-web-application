import { NavLink, Outlet } from 'react-router'

const linkClass = ({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <nav aria-label="Main" className="main-nav">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/people" className={linkClass}>
            People
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/form" className={linkClass}>
            Form
          </NavLink>
          <NavLink to="/forum" className={linkClass}>
            Forum
          </NavLink>
        </nav>
      </header>
      {/* One <main> for the entire app; child routes render into <Outlet /> */}
      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}