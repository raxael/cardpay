import { useNavigate, useLocation } from 'react-router-dom'
import { Home, History, PlusCircle, CreditCard, Settings } from 'lucide-react'
import './BottomNav.css'

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/history', icon: History, label: 'История' },
    { path: '/topup', icon: PlusCircle, label: 'Пополнить' },
    { path: '/cards', icon: CreditCard, label: 'Карты' },
    { path: '/settings', icon: Settings, label: 'Настройки' },
  ]

  return (
    <nav className="bottom-nav">
      {navItems.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`nav-item ${location.pathname === path ? 'active' : ''}`}
        >
          <Icon size={24} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

export default BottomNav

