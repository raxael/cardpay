import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTelegram } from './hooks/useTelegram'
import Layout from './components/Layout'
import Home from './pages/Home'
import History from './pages/History'
import TopUp from './pages/TopUp'
import Cards from './pages/Cards'
import Settings from './pages/Settings'

function App() {
  useTelegram()

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

