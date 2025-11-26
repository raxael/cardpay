import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'
import './CardDetails.css'

const cardData = {
  visa: {
    name: 'Visa',
    type: 'Виртуальная',
    description: 'Виртуальная карта с пополняемым балансом в Рублях или Криптовалюте. Идеально подходит для регулярных онлайн покупок. При оплате картой необходимо использовать настройки вашей сети в соответствии с биллинг-адресом карты.',
    features: [
      { label: 'Валюта', value: 'USD' },
      { label: 'Срок действия', value: '36 месяцев' },
      { label: 'Пополнение в криптовалюте', value: '5%' },
      { label: 'Комиссия за транзакцию', value: '2.5% (min $1,00)' },
      { label: 'Лимит расходов (месяц)', value: '$4,000' },
      { label: 'Обмен/Возврат', value: 'Нет' },
    ],
    serviceFee: '0$/месяц, первый месяц - бесплатно',
    logo: 'visa',
  },
  'visa-prepaid': {
    name: 'Visa Prepaid',
    type: 'Виртуальная',
    description: 'Предоплаченная виртуальная карта. Действует 60 дней. Не требует верификации KYC. Идеально подходит для разовых покупок.',
    features: [
      { label: 'Валюта', value: 'USD' },
      { label: 'Срок действия', value: '60 дней' },
      { label: 'Пополнение в криптовалюте', value: '5%' },
      { label: 'Комиссия за транзакцию', value: '2.5% (min $1,00)' },
      { label: 'Лимит расходов (месяц)', value: '$2,000' },
      { label: 'Обмен/Возврат', value: 'Нет' },
    ],
    serviceFee: '0$/месяц, первый месяц - бесплатно',
    logo: 'visa',
  },
  'mastercard-pro': {
    name: 'Mastercard Pro',
    type: 'Бесконтактная',
    description: 'Карта бесконтактной оплаты с поддержкой Google Pay и Samsung Pay. Идеально подходит для ежедневных покупок и оплаты в магазинах.',
    features: [
      { label: 'Валюта', value: 'USD' },
      { label: 'Срок действия', value: '36 месяцев' },
      { label: 'Пополнение в криптовалюте', value: '9%' },
      { label: 'Комиссия за транзакцию', value: '0.109$' },
      { label: 'Лимит расходов (месяц)', value: '$5,000' },
      { label: 'Обмен/Возврат', value: 'Да' },
    ],
    serviceFee: '0$/месяц, первый месяц - бесплатно',
    logo: 'mastercard',
  },
  'mastercard-smart': {
    name: 'Mastercard Smart',
    type: 'Бесконтактная',
    description: 'Карта бесконтактной оплаты с поддержкой Apple Pay. Идеально подходит для пользователей Apple устройств.',
    features: [
      { label: 'Валюта', value: 'USD' },
      { label: 'Срок действия', value: '36 месяцев' },
      { label: 'Пополнение в криптовалюте', value: '7%' },
      { label: 'Комиссия за транзакцию', value: '0%' },
      { label: 'Лимит расходов (месяц)', value: '$6,000' },
      { label: 'Обмен/Возврат', value: 'Да' },
    ],
    serviceFee: '0$/месяц, первый месяц - бесплатно',
    logo: 'mastercard',
  },
}

function CardDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const { activateAccount } = useApp()
  
  const cardType = location.state?.cardType || 'visa'
  const returnPath = location.state?.returnPath || '/'
  const card = cardData[cardType] || cardData.visa

  const handleIssueCard = () => {
    activateAccount()
    navigate('/')
  }

  // Кнопка "Назад" всегда возвращает на страницу выбора карт (CardIssue)
  // с сохранением исходного returnPath для дальнейшей навигации
  const handleBack = () => {
    navigate('/card-issue', { state: { returnPath } })
  }

  return (
    <div className="card-details-page">
      <button className="back-btn" onClick={handleBack}>
        <ArrowLeft size={20} />
      </button>

      <div className={`card-preview ${card.logo}-card`}>
        <div className={`card-logo ${card.logo}-logo`}>
          {card.logo === 'visa' ? (
            <span>VISA</span>
          ) : (
            <div className="mastercard-circles">
              <div className="mastercard-circle circle-1"></div>
              <div className="mastercard-circle circle-2"></div>
            </div>
          )}
        </div>
      </div>

      <h1 className="card-name">{card.name}</h1>
      
      <p className="card-description">{card.description}</p>

      <Card>
        <h3 className="features-title">Особенности карты</h3>
        <div className="features-list">
          {card.features.map((feature, index) => (
            <div key={index} className="feature-item">
              <span className="feature-label">{feature.label}</span>
              <span className="feature-value">{feature.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <p className="service-fee-note">
        Плата за обслуживание карты - {card.serviceFee}. Подробности читайте в разделе "Тарифы и условия".
      </p>

      <button className="issue-card-btn" onClick={handleIssueCard}>
        Оформить карту
      </button>
    </div>
  )
}

export default CardDetails

