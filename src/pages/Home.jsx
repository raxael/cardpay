import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Plus, HelpCircle, Users, FileText, ArrowRight, MessageCircle, BookOpen, Coins, CreditCard, User, PlusCircle, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const { isVerified, cards } = useApp()
  const [isBalanceHidden, setIsBalanceHidden] = useState(false)
  const [showAllCards, setShowAllCards] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideIntervalRef = useRef(null)

  // Создаем 3 карты для примера
  const displayCards = cards.length > 0 ? [
    cards[0],
    { ...cards[0], id: 2, number: '0000 0000 0000 1111', name: 'Карта 2' },
    { ...cards[0], id: 3, number: '0000 0000 0000 2222', name: 'Карта 3' }
  ] : []
  
  const visibleCards = showAllCards ? displayCards : displayCards.slice(0, 2)

  const usefulItems = [
    {
      icon: HelpCircle,
      title: 'Есть вопросы?',
      description: 'Больше информации в разделе FAQ',
    },
    {
      icon: Users,
      title: 'Реферальная программа',
      description: 'Приглашай друзей и получай $',
    },
    {
      icon: FileText,
      title: 'Тарифы и условия',
      description: 'Узнайте условия использования',
    },
    {
      icon: Coins,
      title: 'Обмен криптовалюты',
      description: 'Официальная покупка и продажа',
    },
  ]

  useEffect(() => {
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % usefulItems.length)
    }, 3000)

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current)
      }
    }
  }, [usefulItems.length])

  const handleSlideChange = (index) => {
    setCurrentSlide(index)
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current)
    }
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % usefulItems.length)
    }, 3000)
  }

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleSlideChange((currentSlide + 1) % usefulItems.length)
    }
    if (isRightSwipe) {
      handleSlideChange((currentSlide - 1 + usefulItems.length) % usefulItems.length)
    }
  }

  return (
    <div className="home">
      <div className="home-header">
        <div className="avatar">
          <User size={32} />
        </div>
        <div className="user-name">User</div>
        {!isVerified && (
          <button 
            className="verify-btn"
            onClick={() => navigate('/verification')}
          >
            Пройти верификацию
          </button>
        )}
      </div>
      
      <Card className="balance-card">
        <div className="balance-top-row">
          <div className="balance-left">
            <div className="balance-header">
              <h3>Баланс карт</h3>
              <button 
                className="toggle-visibility"
                onClick={() => setIsBalanceHidden(!isBalanceHidden)}
              >
                {isBalanceHidden ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="balance-amount">
              {isBalanceHidden ? '••••' : '$0.00'}
            </div>
            <button 
              className="topup-balance-btn"
              onClick={() => navigate('/topup')}
            >
              <PlusCircle size={18} />
              Пополнить баланс
            </button>
          </div>
        </div>
        {cards.length > 0 ? (
          <>
            {visibleCards.map((card, index) => (
              <div key={card.id || index} className="card-preview-wrapper">
                <div className="card-mini-preview">
                  <div className={`card-mini ${card.type === 'Visa' ? 'visa-mini' : 'mastercard-mini'}`}>
                    <div className="card-mini-text">карта{index + 1}</div>
                    <div className="card-mini-logo">
                      {card.type === 'Visa' ? 'VISA' : (
                        <div className="mastercard-mini-circles">
                          <div className="mastercard-mini-circle circle-1"></div>
                          <div className="mastercard-mini-circle circle-2"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-preview-buttons">
                  <button 
                    className="card-preview-btn"
                    onClick={() => navigate('/cards')}
                  >
                    Перейти
                  </button>
                </div>
              </div>
            ))}
            {displayCards.length > 2 && (
              <button 
                className={`all-cards-link ${showAllCards ? 'expanded' : ''}`}
                onClick={() => setShowAllCards(!showAllCards)}
              >
                <ChevronDown size={20} className={showAllCards ? 'rotated' : ''} />
                все карты
              </button>
            )}
          </>
        ) : (
          <>
            <div className="no-cards-wrapper">
              <CreditCard size={48} className="no-cards-icon" />
              <p className="no-cards-text">Пока нет виртуальных карт</p>
            </div>
            <button 
              className="issue-card-btn"
              onClick={() => navigate('/card-issue', { state: { returnPath: '/' } })}
            >
              <Plus size={20} />
              Выпустить карту
            </button>
          </>
        )}
      </Card>

      <Card className="wallet-mini-card">
        <div className="wallet-info">
          <div className="wallet-amount">В кошельке - $0.00</div>
          <div className="wallet-label">Ваш внутренний кошелёк</div>
        </div>
      </Card>

      <div className="useful-section">
        <h3 className="useful-title">Полезно знать</h3>
        
        <div 
          className="useful-slider"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="useful-slider-track"
            style={{ transform: `translateX(calc(-${currentSlide} * (100% + 12px)))` }}
          >
            {usefulItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="useful-item">
                  <div className="useful-item-content">
                    <div className="useful-item-text">
                      <div className="useful-item-title">{item.title}</div>
                      <div className="useful-item-description">{item.description}</div>
                      <a href="#" className="useful-link">
                        Подробнее
                        <ArrowRight size={16} />
                      </a>
                    </div>
                    <Icon size={20} className="useful-icon" />
                  </div>
                </Card>
              )
            })}
          </div>
          
          <div className="slider-dots">
            {usefulItems.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <Card className="useful-links-card">
          <a href="#" className="useful-link-item">
            <MessageCircle size={18} />
            <div className="useful-link-item-content">
              <span className="useful-link-title">Наш Telegram-канал</span>
              <span className="useful-link-desc">Вступайте в сообщество</span>
            </div>
          </a>
          <div className="useful-link-divider"></div>
          <a href="#" className="useful-link-item">
            <BookOpen size={18} />
            <div className="useful-link-item-content">
              <span className="useful-link-title">FAQ</span>
              <span className="useful-link-desc">Инструкции и условия использования</span>
            </div>
          </a>
        </Card>
      </div>
    </div>
  )
}

export default Home

