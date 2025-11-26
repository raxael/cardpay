import { useState } from 'react'
import { Copy, Share2, CheckCircle, Coins, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import './TopUp.css'

const TronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" id="_x3C_Layer_x3E_">
    <style type="text/css">
      {`.st0{fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:1.5;}
        .st1{fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:1.5;}`}
    </style>
    <g id="Tron_x2C__crypto_1_">
      <polygon className="st1" points="16,12.5 13.5,30.5 29.5,10.5"/>
      <polygon className="st1" points="2.5,1.5 16,12.5 24.2,5.3"/>
      <line className="st1" x1="29.5" x2="16" y1="10.5" y2="12.5"/>
      <line className="st1" x1="2.5" x2="16" y1="1.5" y2="12.5"/>
      <polyline className="st1" points="13.5,30.5 16,12.5 24.2,5.3"/>
      <polygon className="st1" points="2.5,1.5 13.5,30.5 29.5,10.5 24.2,5.3"/>
    </g>
  </svg>
)

const TonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path fill="#ffffff" d="M19.012 9.201L12.66 19.316a.857.857 0 0 1-1.453-.005L4.98 9.197a1.8 1.8 0 0 1-.266-.943a1.856 1.856 0 0 1 1.882-1.826h10.817c1.033 0 1.873.815 1.873 1.822a1.8 1.8 0 0 1-.274.951M6.51 8.863l4.633 7.144V8.143H6.994c-.48 0-.694.317-.484.72m6.347 7.144l4.633-7.144c.214-.403-.004-.72-.484-.72h-4.149z"/>
  </svg>
)

const getBlockchainIcon = (network, name) => {
  if (network === 'TRON' || name.includes('TRC')) {
    return <TronIcon />
  }
  if (network === 'TON' || name.includes('TON')) {
    return <TonIcon />
  }
  return <Coins size={24} />
}

const paymentMethods = [
  { id: 'usdt-trc20', name: 'USDT TRC-20', network: 'TRON', icon: 'TRON' },
  { id: 'usdt-ton', name: 'USDT TON', network: 'TON', icon: 'TON' },
  { id: 'trx', name: 'TRX', network: 'TRON', icon: 'TRON' },
  { id: 'ton', name: 'TON', network: 'TON', icon: 'TON' },
]

function TopUp() {
  const { isActivated } = useApp()
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [copied, setCopied] = useState(false)

  if (!isActivated) {
    return (
      <div className="topup">
        <EmptyState
          title="Пополнение недоступно"
          description="Активируйте карту на главной странице, чтобы начать пополнять баланс"
          icon="card"
        />
      </div>
    )
  }

  const address = selectedMethod
    ? 'TQzK8J8vJ8vJ8vJ8vJ8vJ8vJ8vJ8vJ8vJ'
    : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="topup">
      <div className="topup-nav">
        <button className="nav-tab active">Пополнить</button>
        <button className="nav-tab">Вывести</button>
      </div>

      {!selectedMethod ? (
        <>
          <div className="payment-methods">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className="payment-method"
                onClick={() => setSelectedMethod(method)}
              >
                <div className="method-icon">
                  {getBlockchainIcon(method.network, method.name)}
                </div>
                <div className="method-info">
                  <div className="method-name">{method.name}</div>
                  <div className="method-network">{method.network}</div>
                </div>
                <div className="method-arrow">→</div>
              </Card>
            ))}
          </div>

          <div className="warning-text">
            USDT TRC-20 и USDT TON — разные сети. Проверьте, что выбрана
            верная.
          </div>
        </>
      ) : (
        <div className="payment-form">
          <Card>
            <div className="form-header">
              <div className="selected-method-info">
                <div className="method-icon">
                  {getBlockchainIcon(selectedMethod.network, selectedMethod.name)}
                </div>
                <div>
                  <div className="method-name">{selectedMethod.name}</div>
                  <div className="method-network">{selectedMethod.network}</div>
                </div>
              </div>
              <button
                className="change-method-btn"
                onClick={() => setSelectedMethod(null)}
              >
                Изменить
              </button>
            </div>

            <div className="address-input-group">
              <input
                type="text"
                value={address}
                readOnly
                className="address-input"
              />
              <div className="address-actions">
                <button
                  className="icon-btn"
                  onClick={handleCopy}
                  title="Копировать"
                >
                  <Copy size={20} />
                </button>
                <button className="icon-btn" title="Поделиться">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {copied && (
              <div className="copied-message">
                <CheckCircle size={16} />
                Скопировано!
              </div>
            )}

            <div className="qr-code-placeholder">
              <div className="qr-code">QR</div>
            </div>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">✓</div>
                <div>
                  Поддерживаемые сети: TON, TRX, USDT (TRC-20 / TON)
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⚠</div>
                <div >
                  Переводы в другой сети не зачисляются
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⏱</div>
                <div>Зачисление: ~1–2 минуты</div>
              </div>
            </div>

            <button className="check-payment-btn">
              <CheckCircle size={20} />
              Проверить зачисление
            </button>

            <div className="payment-note">
              Переводы зачисляются ~1–2 мин.
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default TopUp

