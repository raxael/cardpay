import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Apple, Plus, Star, Trash2 } from 'lucide-react'
import Card from '../components/Card'
import './Cards.css'

function Cards() {
  const navigate = useNavigate()
  const [cardName, setCardName] = useState('Платженая система * 6543')
  const [purpose, setPurpose] = useState('Реклама')
  const [onlinePayments, setOnlinePayments] = useState(true)
  const [nfcPay, setNfcPay] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [isPrimary, setIsPrimary] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showReissueModal, setShowReissueModal] = useState(false)

  const purposes = ['Реклама', 'Подписки', 'Путешествия', 'Фриланс', 'Другое']

  const historyItems = [
    { title: 'Netflix', amount: -15.99, date: '03 Oct' },
    { title: 'Google Ads', amount: -45.50, date: '02 Oct' },
    { title: 'Chat GPT', amount: -20.00, date: '01 Oct' },
  ]

  return (
    <div className="cards-page">
      <div className="cards-header">
        <h1 className="cards-title">Карты (2)</h1>
        <button className="issue-card-btn">
          <Plus size={20} />
          Выпустить карту
        </button>
      </div>

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
          <div className="card-date">12/28</div>
          <div className="card-chip">
            <div className="chip"></div>
          </div>
        </div>
      </Card>

      <div className="card-actions">
        <button className="action-btn">Заморозить</button>
        <button className="action-btn" onClick={() => setShowReissueModal(true)}>
          Перевыпустить
        </button>
        <button className="action-btn">Apple / Google Pay</button>
        <button className="action-btn" onClick={() => setShowDetails(true)}>
          Реквизиты
        </button>
      </div>

      <Card>
        <div className="card-name-section">
          <h3 className="section-title">Название карты</h3>
          <select
            className="card-name-select"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          >
            <option>Платженая система * 6543</option>
            <option>Основная карта * 1234</option>
            <option>Резервная * 5678</option>
          </select>
        </div>

        <div className="purpose-section">
          <h3 className="section-title">Назначение</h3>
          <div className="purpose-buttons">
            {purposes.map((p) => (
              <button
                key={p}
                className={`purpose-btn ${purpose === p ? 'active' : ''}`}
                onClick={() => setPurpose(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <button 
          className="make-primary-btn"
          onClick={() => setIsPrimary(!isPrimary)}
        >
          <Star size={18} fill={isPrimary ? "#ff0000" : "none"} stroke={isPrimary ? "#ff0000" : "#ffffff"} />
          {isPrimary ? 'Основная карта' : 'Сделать основной'}
        </button>
      </Card>

      <Card>
        <h3 className="section-title">Безопасность</h3>
        <div className="security-list">
          <div className="security-item">
            <span>Онлайн-платежи</span>
            <label className="toggle">
              <input
                type="checkbox"
                checked={onlinePayments}
                onChange={(e) => setOnlinePayments(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="security-item">
            <span>Оплата через Pay (NFC)</span>
            <label className="toggle">
              <input
                type="checkbox"
                checked={nfcPay}
                onChange={(e) => setNfcPay(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="section-title">История</h3>
        <div className="history-list">
          {historyItems.map((item, idx) => (
            <div key={idx} className="history-item">
              <div className="history-info">
                <div className="history-title">{item.title}</div>
                <div className="history-date">{item.date}</div>
              </div>
              <div className={`history-amount ${item.amount < 0 ? 'negative' : 'positive'}`}>
                ${Math.abs(item.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <button 
          className="all-operations-btn"
          onClick={() => navigate('/history')}
        >
          Все операции
        </button>
      </Card>

      <Card>
        <div className="info-list">
          <div className="info-row">
            <span className="info-label">Тип</span>
            <span className="info-value">Виртуальная Visa</span>
          </div>
          <div className="info-row">
            <span className="info-label">BIN / Гео</span>
            <span className="info-value">5355 12 • EU</span>
          </div>
          <div className="info-row">
            <span className="info-label">Подключена к Pay</span>
            <span className="info-value">Нет</span>
          </div>
          <div className="info-row">
            <span className="info-label">Срок действия</span>
            <span className="info-value">12/28</span>
          </div>
        </div>
      </Card>

      <Card className="danger-zone">
        <h3 className="section-title">Опасная зона</h3>
        <button 
          className="delete-card-btn"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash2 size={18} />
          Удалить карту
        </button>
        <div className="danger-note">Восстановить будет нельзя</div>
      </Card>

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
                <span>12/28</span>
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

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Удалить карту</h3>
            </div>
            <div className="modal-content">
              <p>Вы уверены, что хотите удалить эту карту? Это действие нельзя отменить.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Отмена
              </button>
              <button 
                className="modal-btn confirm"
                onClick={() => {
                  setShowDeleteModal(false)
                  // Здесь будет логика удаления карты
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {showReissueModal && (
        <div className="modal-overlay" onClick={() => setShowReissueModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Перевыпустить карту</h3>
            </div>
            <div className="modal-content">
              <p>Вы уверены, что хотите перевыпустить эту карту? Старая карта будет заблокирована, а новая будет отправлена на ваш адрес.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel"
                onClick={() => setShowReissueModal(false)}
              >
                Отмена
              </button>
              <button 
                className="modal-btn confirm"
                onClick={() => {
                  setShowReissueModal(false)
                  // Здесь будет логика перевыпуска карты
                }}
              >
                Перевыпустить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards
