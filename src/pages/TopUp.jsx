import { useState } from 'react'
import { Copy, Share2, CheckCircle, Coins, Zap } from 'lucide-react'
import Card from '../components/Card'
import './TopUp.css'

const TronIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#EF0027"/>
    <path d="M12 3L8 7h8l-4-4z" fill="white"/>
    <path d="M8 7v9l4 4v-9H8z" fill="white"/>
    <path d="M16 7v9l-4 4v-9h4z" fill="white"/>
    <path d="M8 16l4 4 4-4h-4V7H8v9z" fill="#EF0027" opacity="0.3"/>
  </svg>
)

const TonIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#0088CC"/>
    <path d="M12 4L8 8h3v8h2V8h3L12 4z" fill="white"/>
    <path d="M8 16l4 4 4-4h-3V8h-2v8H8z" fill="white" opacity="0.7"/>
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
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [copied, setCopied] = useState(false)

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
                <div className="info-text">
                  Поддерживаемые сети: TON, TRX, USDT (TRC-20 / TON)
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⚠</div>
                <div className="info-text">
                  Переводы в другой сети не зачисляются
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⏱</div>
                <div className="info-text">Зачисление: ~1–2 минуты</div>
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

