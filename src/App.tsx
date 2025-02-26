import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Diagram from '@/pages/Diagram'
import Charts from '@/pages/Charts'
import { CssBaseline } from '@mui/material'
import Layout from '@/components/layout'

const App = () => {
  return (
    <HashRouter>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
