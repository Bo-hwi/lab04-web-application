import { Routes, Route } from 'react-router'
import Layout from './components/Layout.jsx'
import { Home, About, NotFound } from './pages/StaticPages.jsx'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}