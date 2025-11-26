import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Plus, HelpCircle, Users, FileText, ArrowRight, MessageCircle, BookOpen, Coins, CreditCard } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Card from './Card'
import './HomeEmptyState.css'

function HomeEmptyState() {
  const navigate = useNavigate()
  const [isBalanceHidden, setIsBalanceHidden] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideIntervalRef = useRef(null)

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
    }, 3000) // Меняем слайд каждые 3 секунды

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current)
      }
    }
  }, [usefulItems.length])

  const handleSlideChange = (index) => {
    setCurrentSlide(index)
    // Сбрасываем таймер при ручном переключении
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current)
    }
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % usefulItems.length)
    }, 3000)
  }

  // Поддержка свайпа
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
    <div className="home-empty-state">
      <Card className="balance-card-empty">
        <div className="balance-top-row">
          <div className="balance-left">
            <div className="balance-header-empty">
              <h3>Баланс карт</h3>
              <button 
                className="toggle-visibility-empty"
                onClick={() => setIsBalanceHidden(!isBalanceHidden)}
              >
                {isBalanceHidden ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="balance-amount-empty">
              {isBalanceHidden ? '••••' : '$0.00'}
            </div>
          </div>
          <Link 
            to="/cards"
            className="all-cards-btn"
          >
            Все карты
          </Link>
        </div>
        <div className="no-cards-wrapper">
          <CreditCard size={48} className="no-cards-icon" />
          <p className="no-cards-text">Пока нет виртуальных карт</p>
        </div>
        <button 
          className="issue-card-btn-empty"
          onClick={() => navigate('/card-issue', { state: { returnPath: '/' } })}
        >
          <Plus size={20} />
          Выпустить карту
        </button>
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
            style={{ transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 12}px))` }}
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

export default HomeEmptyState

