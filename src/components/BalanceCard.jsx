import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Card from './Card'
import './BalanceCard.css'

function BalanceCard() {
  const [isHidden, setIsHidden] = useState(false)

  return (
    <Card>
      <div className="balance-header">
        <h3>Баланс и лимиты</h3>
        <button 
          className="toggle-visibility"
          onClick={() => setIsHidden(!isHidden)}
        >
          {isHidden ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="balance-amount">
        {isHidden ? '••••' : '$1,234.56'}
      </div>
      <div className="balance-status">
        <span className="badge active">Активная</span>
      </div>
      <div className="limit-info">
        <span>Лимит: $920 / $5,000</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(920 / 5000) * 100}%` }}
        />
      </div>
    </Card>
  )
}

export default BalanceCard

