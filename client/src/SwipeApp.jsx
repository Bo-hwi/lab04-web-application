import { Link, Navigate, Route, Routes } from 'react-router'
import SwipeDeck from './SwipeDeck.jsx'

export default function SwipeApp() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/swipe" replace />} />
      <Route path="/swipe" element={<SwipeDeck />} />
      <Route path="*" element={<main><h1>Not Found</h1><Link to="/swipe">Return to swipe deck</Link></main>} />
    </Routes>
  )
}
