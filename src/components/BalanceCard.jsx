import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from './Card'
import './BalanceCard.css'

function BalanceCard() {
  const { balance, setBalance } = useApp()
  const [isHidden, setIsHidden] = useState(false)

  if (!balance) return null

  const toggleHidden = () => {
    setIsHidden(!isHidden)
    setBalance({ ...balance, isHidden: !isHidden })
  }

  return (
    <Card>
      <div className="balance-header">
        <h3>Баланс и лимиты</h3>
        <button 
          className="toggle-visibility"
          onClick={toggleHidden}
        >
          {isHidden ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="balance-amount">
        {isHidden ? '••••' : `$${balance.amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      </div>
      <div className="balance-status">
        <span className="badge active">Активная</span>
      </div>
      <div className="limit-info">
        <span>Лимит: ${balance.limit.toLocaleString('ru-RU')} / ${balance.maxLimit.toLocaleString('ru-RU')}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(balance.limit / balance.maxLimit) * 100}%` }}
        />
      </div>
    </Card>
  )
}

export default BalanceCard

