import { Link, Navigate, Route, Routes, useLocation } from 'react-router'
import App from './App.jsx'

export default function GalleryRoutes() {
  const { search } = useLocation()
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/gallery${search}`} replace />} />
      <Route path="/gallery" element={<App />} />
      <Route path="*" element={
        <main>
          <h1>Not Found</h1>
          <Link to="/gallery">Return to gallery</Link>
        </main>
      } />
    </Routes>
  )
}
