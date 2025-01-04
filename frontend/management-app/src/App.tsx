import { Route, Routes } from 'react-router-dom'
import './App.css'
import Overview from './pages/Overview'
import Page404 from './pages/Page404'
import Layout from './components/Layout'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='' element={<Overview />} />
          <Route path="*" element={<Page404 />} />
        </Route>

      </Routes>

    </>
  )
}

export default App
