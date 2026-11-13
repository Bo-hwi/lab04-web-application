import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Layout from './components/Layout.jsx'
import Skeleton from './components/Skeleton.jsx'
import PeopleLayout from './pages/PeopleLayout.jsx'
import { Home, About, NotFound, PeopleIndex } from './pages/StaticPages.jsx'
import { people } from './data/people.js'
import './App.css'

// Ex 1.1: declare lazy() in the file that uses it (App.jsx), not in PersonDetail itself
// React.lazy requires PersonDetail.jsx to have a default export
const PersonDetail = lazy(() => import('./pages/PersonDetail.jsx'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="people" element={<PeopleLayout people={people} />}>
          <Route index element={<PeopleIndex />} />
          <Route
            path=":id"
            element={
              <Suspense fallback={<Skeleton />}>
                <PersonDetail people={people} />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}