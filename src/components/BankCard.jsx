import { useState } from 'react'
import { Apple } from 'lucide-react'
import Card from './Card'
import './BankCard.css'

function BankCard() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="bank-card">
      <div className="bank-card-header">
        <div className="payment-system">VISA</div>
        <div className="card-status">
          <span className="badge active">Активная</span>
          <Apple size={22} />
        </div>
      </div>
      <div className="card-number">0000 0000 0000 0000</div>
      <div className="card-holder-info">
        <div className="card-date">12/25</div>
        <div className="card-chip">
          <div className="chip"></div>
        </div>
      </div>
      <button 
        className="show-details-btn"
        onClick={() => setShowDetails(true)}
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
                <span>0000 0000 0000 0000</span>
              </div>
              <div className="detail-row">
                <span>Срок действия:</span>
                <span>12/25</span>
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

