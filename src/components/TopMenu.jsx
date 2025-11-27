import { Bell, MessageCircle, ArrowLeft } from 'lucide-react'
import './TopMenu.css'

function TopMenu() {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <header className="top-menu">
      <div className="top-menu-left">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <a href="https://change.pro" target="_blank" rel="noopener noreferrer" className="logo-link">
          <img 
            src="https://change.pro/media/images/logos/logo-short-light.svg" 
            alt="CardPay PRO" 
            className="logo-image"
          />
        </a>
        <div className="logo-text">CardPay PRO</div>
      </div>
      <div className="top-menu-right">
        <button className="icon-button">
          <Bell size={20} />
        </button>
        <button className="icon-button">
          <MessageCircle size={20} />
        </button>
      </div>
    </header>
  )
}

export default TopMenu

