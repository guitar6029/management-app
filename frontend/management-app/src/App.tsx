import './App.css'
import { Route, Routes } from 'react-router-dom'
import Departments from './pages/Departments'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import Page404 from './pages/Page404'
import Tools from './pages/Tools'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='' element={<Overview />} />
          <Route path='/departments' element={<Departments />} />
          <Route path='/tools' element={<Tools />} />
          <Route path="*" element={<Page404 />} />
        </Route>

      </Routes>

    </>
  )
}

export default App
