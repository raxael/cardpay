import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTelegram } from './hooks/useTelegram'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import History from './pages/History'
import TopUp from './pages/TopUp'
import Cards from './pages/Cards'
import Settings from './pages/Settings'
import Verification from './pages/Verification'
import CardIssue from './pages/CardIssue'
import CardDetails from './pages/CardDetails'

function App() {
  useTelegram()

  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/topup" element={<TopUp />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/card-issue" element={<CardIssue />} />
            <Route path="/card-details" element={<CardDetails />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  )
}

export default App

