import { useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import TopMenu from './TopMenu'

function Layout({ children }) {
  const location = useLocation()
  const showTopMenu = location.pathname !== '/'

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {showTopMenu && <TopMenu />}
      <main style={{ padding: '16px' }}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout

