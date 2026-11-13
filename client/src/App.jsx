import { Routes, Route } from 'react-router'
import Layout from './components/Layout.jsx'
import PeopleLayout from './pages/PeopleLayout.jsx'
import PersonDetail from './pages/PersonDetail.jsx'
import { Home, About, NotFound, PeopleIndex } from './pages/StaticPages.jsx'
import { people } from './data/people.js'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="people" element={<PeopleLayout people={people} />}>
          <Route index element={<PeopleIndex />} />
          <Route path=":id" element={<PersonDetail people={people} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}