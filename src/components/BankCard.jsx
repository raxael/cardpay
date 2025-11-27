import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Apple } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from './Card'
import './BankCard.css'

function BankCard({ returnPath = '/' }) {
  const { cards } = useApp()
  const navigate = useNavigate()
  const [showDetails, setShowDetails] = useState(false)

  const card = cards.length > 0 ? cards[0] : null

  if (!card) return null

  return (
    <Card className="bank-card">
      <div className="bank-card-header">
        <div className="payment-system">{card.type}</div>
        <div className="card-status">
          <span className="badge active">Активная</span>
          <Apple size={22} />
        </div>
      </div>
      <div className="card-number">{card.number}</div>
      <div className="card-holder-info">
        <div className="card-date">{card.expiryDate}</div>
        <div className="card-chip">
          <div className="chip"></div>
        </div>
      </div>
      <button 
        className="show-details-btn"
        onClick={(e) => {
          e.stopPropagation()
          setShowDetails(true)
        }}
      >
        Показать реквизиты
      </button>
      
      {showDetails && (
        <div className="sheet-overlay" onClick={() => setShowDetails(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-header">
              <h3>Реквизиты карты</h3>
              <button onClick={() => setShowDetails(false)}>✕</button>
            </div>
            <div className="sheet-content">
              <div className="detail-row">
                <span>Номер карты:</span>
                <span>{card.number}</span>
              </div>
              <div className="detail-row">
                <span>Срок действия:</span>
                <span>{card.expiryDate}</span>
              </div>
              <div className="detail-row">
                <span>CVV:</span>
                <span>***</span>
              </div>
              <div className="detail-row">
                <span>Имя держателя:</span>
                <span>IVAN IVANOV</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default BankCard

