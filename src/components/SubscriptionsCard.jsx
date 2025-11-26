import { Repeat } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from './Card'
import './SubscriptionsCard.css'

function SubscriptionsCard() {
  const { subscriptions } = useApp()

  if (!subscriptions || subscriptions.length === 0) return null

  const nextSubscription = subscriptions[0]

  return (
    <Card>
      <div className="subscriptions-title-section">
        <div className="subscriptions-title">
          <Repeat size={20} />
          <h3>Подписки</h3>
        </div>
      </div>
      <div className="subscriptions-header">
        <div className="next-charge">
          Ближайшее списание: {nextSubscription.name} ${nextSubscription.amount.toFixed(2)} • {nextSubscription.nextCharge}
        </div>
      </div>
      <div className="subscription-badges">
        {subscriptions.map((sub) => (
          <span key={sub.name} className="sub-badge">{sub.name}</span>
        ))}
      </div>
      <div className="subscription-actions">
        <button className="action-btn">Управлять</button>
        <button className="action-btn secondary">Отключить автоплатеж</button>
      </div>
    </Card>
  )
}

export default SubscriptionsCard

