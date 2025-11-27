import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import './CardIssue.css'

function CardIssue() {
  const navigate = useNavigate()
  const location = useLocation()
  const { activateAccount, isVerified } = useApp()
  
  // Получаем returnPath из state, если его нет - используем дефолт '/'
  const returnPath = location.state?.returnPath || '/'

  const handleOpenCard = (cardType) => {
    if (!isVerified) {
      navigate('/verification')
    } else {
      activateAccount()
      navigate(returnPath)
    }
  }

  const handleBack = () => {
    navigate(returnPath)
  }

  return (
    <div className="card-issue-page">
      <button className="back-btn" onClick={handleBack}>
        <ArrowLeft size={20} />
      </button>
      
      <h1 className="page-title">Выберите тип карты</h1>

      <div className="card-category">
        <h2 className="category-title">Виртуальные</h2>
        
        <div className="cards-grid">
          <div className="card-item">
            <div className="card-preview visa-card-bg">
              <div className="card-icon-wrapper">
                <ChevronRight size={16} />
                <ChevronRight size={16} />
              </div>
              <div className="card-option-logo visa-logo">VISA</div>
            </div>
            <div className="card-option-title">Visa</div>
            <div className="card-description-wrapper">
              <p className="card-option-description">
                Для регулярных платежей. Пополняемый баланс. Криптовалюта USDT - 5%.
              </p>
            </div>
            <button 
              className="open-card-btn"
              onClick={() => handleOpenCard('visa')}
            >
              Открыть
            </button>
          </div>

          <div className="card-item">
            <div className="card-preview visa-card-bg">
              <div className="card-icon-wrapper">
                <ChevronRight size={16} />
                <ChevronRight size={16} />
              </div>
              <div className="card-option-logo visa-logo">VISA</div>
            </div>
            <div className="card-option-title">Visa Prepaid</div>
            <div className="card-description-wrapper">
              <p className="card-option-description">
                Предоплаченная карта. Действует 60 дней. Не требует верификации KYC.
              </p>
            </div>
            <button 
              className="open-card-btn"
              onClick={() => handleOpenCard('visa-prepaid')}
            >
              Открыть
            </button>
          </div>
        </div>
      </div>

      <div className="card-category">
        <h2 className="category-title">Карты бесконтактной оплаты</h2>
        
        <div className="cards-grid">
          <div className="card-item">
            <div className="card-preview mastercard-card-bg">
              <div className="card-icon-wrapper">
                <ChevronRight size={16} />
                <ChevronRight size={16} />
              </div>
              <div className="card-option-logo mastercard-logo">
                <div className="mastercard-circle circle-1"></div>
                <div className="mastercard-circle circle-2"></div>
              </div>
            </div>
            <div className="card-option-title">Mastercard Pro</div>
            <div className="card-description-wrapper">
              <p className="card-option-description">
                Поддержка Google Pay и Samsung Pay. 0.109$ комиссия за транзакции. Пополнение в USDT - 9%.
              </p>
            </div>
            <button 
              className="open-card-btn"
              onClick={() => handleOpenCard('mastercard-pro')}
            >
              Открыть
            </button>
          </div>

          <div className="card-item">
            <div className="card-preview mastercard-card-bg">
              <div className="card-icon-wrapper">
                <ChevronRight size={16} />
                <ChevronRight size={16} />
              </div>
              <div className="card-option-logo mastercard-logo">
                <div className="mastercard-circle circle-1"></div>
                <div className="mastercard-circle circle-2"></div>
              </div>
            </div>
            <div className="card-option-title">Mastercard Smart</div>
            <div className="card-description-wrapper">
              <p className="card-option-description">
                Поддержка Apple Pay. 0% комиссия за транзакции. Пополнение в USDT - 7%.
              </p>
            </div>
            <button 
              className="open-card-btn"
              onClick={() => handleOpenCard('mastercard-smart')}
            >
              Открыть
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardIssue

