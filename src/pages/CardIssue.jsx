import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'
import './CardIssue.css'

function CardIssue() {
  const navigate = useNavigate()
  const location = useLocation()
  const { activateAccount } = useApp()
  
  // Получаем returnPath из state, если его нет - используем дефолт '/'
  const returnPath = location.state?.returnPath || '/'

  const handleCardSelect = (cardType) => {
    navigate('/card-details', { state: { cardType, returnPath } })
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
        
        <Card className="card-option" onClick={() => handleCardSelect('visa')}>
          <div className="card-option-header">
            <div className="card-option-title">Visa</div>
            <div className="card-option-logo visa-logo">VISA</div>
          </div>
          <p className="card-option-description">
            Для регулярных платежей. Пополняемый баланс. Криптовалюта USDT - 5%.
          </p>
        </Card>

        <Card className="card-option" onClick={() => handleCardSelect('visa-prepaid')}>
          <div className="card-option-header">
            <div className="card-option-title">Visa Prepaid</div>
            <div className="card-option-logo visa-logo">VISA</div>
          </div>
          <p className="card-option-description">
            Предоплаченная карта. Действует 60 дней. Не требует верификации KYC.
          </p>
        </Card>
      </div>

      <div className="card-category">
        <h2 className="category-title">Карты бесконтактной оплаты</h2>
        
        <Card className="card-option" onClick={() => handleCardSelect('mastercard-pro')}>
          <div className="card-option-header">
            <div className="card-option-title">Mastercard Pro</div>
            <div className="card-option-logo mastercard-logo">
              <div className="mastercard-circle circle-1"></div>
              <div className="mastercard-circle circle-2"></div>
            </div>
          </div>
          <p className="card-option-description">
            Поддержка Google Pay и Samsung Pay. 0.109$ комиссия за транзакции. Пополнение в USDT - 9%.
          </p>
        </Card>

        <Card className="card-option" onClick={() => handleCardSelect('mastercard-smart')}>
          <div className="card-option-header">
            <div className="card-option-title">Mastercard Smart</div>
            <div className="card-option-logo mastercard-logo">
              <div className="mastercard-circle circle-1"></div>
              <div className="mastercard-circle circle-2"></div>
            </div>
          </div>
          <p className="card-option-description">
            Поддержка Apple Pay. 0% комиссия за транзакции. Пополнение в USDT - 7%.
          </p>
        </Card>
      </div>
    </div>
  )
}

export default CardIssue

