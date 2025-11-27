import { useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import TopMenu from './TopMenu'

function Layout({ children }) {
  const location = useLocation()
  const hideTopMenuPaths = ['/', '/verification', '/card-issue']
  const showTopMenu = !hideTopMenuPaths.includes(location.pathname)
  const noPaddingPaths = ['/verification', '/card-issue']

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {showTopMenu && <TopMenu />}
      <main style={{ padding: noPaddingPaths.includes(location.pathname) ? '0' : '16px' }}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout

