import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Shield, CreditCard, Bell, User, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'
import './Settings.css'

function Settings() {
  const navigate = useNavigate()
  const { isActivated } = useApp()
  const [showVerificationSheet, setShowVerificationSheet] = useState(false)
  const [security, setSecurity] = useState({
    secure3d: true,
    faceId: true,
    biometricTransfers: true,
    newDeviceAlerts: true,
  })

  const [payments, setPayments] = useState({
    autopay: true,
  })

  const [notifications, setNotifications] = useState({
    emailReceipts: true,
    pushNotifications: true,
  })

  const toggleSecurity = (key) => {
    setSecurity((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const togglePayments = (key) => {
    setPayments((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleNotifications = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="settings">
      <button 
        className="verification-btn"
        onClick={() => setShowVerificationSheet(true)}
      >
        Пройти верификацию
      </button>

      <Card className="support-card">
        <div className="card-header">
          <MessageCircle size={24} />
          <h3>Персональный менеджер</h3>
        </div>
        <p className="card-description">
          Личный менеджер отвечает 24/7: подключение, лимиты, спорные платежи и
          рекламные кабинеты.
        </p>
        <button className="support-btn">Написать в поддержку</button>
        <div className="support-info">
          Онлайн 24/7 • ответ обычно в течение нескольких минут
        </div>
      </Card>

      <Card>
        <h3 className="card-title">Безопасность</h3>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-left">
              <Shield size={20} />
              <span>3-D Secure</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={security.secure3d}
                onChange={() => toggleSecurity('secure3d')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-left">
              <Shield size={20} />
              <span>Вход по Face ID / PIN</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={security.faceId}
                onChange={() => toggleSecurity('faceId')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-left">
              <Shield size={20} />
              <span>Подтверждать переводы биометрией</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={security.biometricTransfers}
                onChange={() => toggleSecurity('biometricTransfers')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-left">
              <Shield size={20} />
              <span>Оповещать о входе с нового устройства</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={security.newDeviceAlerts}
                onChange={() => toggleSecurity('newDeviceAlerts')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div className="card-note">
          Рекомендуем держать все тумблеры включёнными — максимальная защита.
        </div>
      </Card>

      {isActivated && (
        <Card>
          <h3 className="card-title">Платежи и карты</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-left">
                <CreditCard size={20} />
                <span>Валюта карты</span>
              </div>
              <div className="badges">
                <span className="badge active">USD</span>
                <span className="badge">EUR</span>
                <span className="badge">GBP</span>
              </div>
            </div>
            <div className="setting-item">
              <div className="setting-left">
                <CreditCard size={20} />
                <span>Apple Pay / Google Pay</span>
              </div>
              <span className="badge success">поддерживается</span>
            </div>
            <div className="setting-item">
              <div className="setting-left">
                <CreditCard size={20} />
                <span>Автоплатежи и подписки</span>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={payments.autopay}
                  onChange={() => togglePayments('autopay')}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-left">
                <CreditCard size={20} />
                <span>Биллинг-адрес</span>
              </div>
              <span className="badge disabled">после активации</span>
            </div>
          </div>
          <div className="card-note">
            Изменения доступны после активации.
          </div>
        </Card>
      )}

      <Card>
        <h3 className="card-title">Уведомления</h3>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-left">
              <Bell size={20} />
              <span>Квитанции на email</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={notifications.emailReceipts}
                onChange={() => toggleNotifications('emailReceipts')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-left">
              <Bell size={20} />
              <span>Push-уведомления</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={() => toggleNotifications('pushNotifications')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="card-title">Профиль</h3>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-left">
              <User size={20} />
              <span>Имя владельца карты</span>
            </div>
            <button className="link-btn" disabled={!isActivated}>изменить</button>
          </div>
          <div className="setting-item">
            <div className="setting-left">
              <User size={20} />
              <span>Контактный email / телефон</span>
            </div>
            <button className="link-btn" disabled={!isActivated}>изменить</button>
          </div>
        </div>
        <div className="card-note">
          Изменения доступны после активации
        </div>
      </Card>

      {showVerificationSheet && (
        <div className="sheet-overlay" onClick={() => setShowVerificationSheet(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-header">
              <h3>Верификация аккаунта</h3>
              <button onClick={() => setShowVerificationSheet(false)}>✕</button>
            </div>
            <div className="sheet-content">
              <p className="verification-description">
                Для верификации аккаунта и получения доступа ко всем функциям, необходимо:
              </p>
              <div className="verification-list">
                <div className="verification-item">
                  <User size={20} />
                  <span>Укажите ваши данные</span>
                </div>
                <div className="verification-item">
                  <CheckCircle size={20} />
                  <span>Подтвердите личность</span>
                </div>
              </div>
              <button 
                className="verification-start-btn"
                onClick={() => {
                  setShowVerificationSheet(false)
                  navigate('/verification')
                }}
              >
                Начать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings

