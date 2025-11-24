import { Repeat } from 'lucide-react'
import Card from './Card'
import './SubscriptionsCard.css'

function SubscriptionsCard() {
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
          Ближайшее списание: Netflix $15.99 • 03 Oct
        </div>
      </div>
      <div className="subscription-badges">
        <span className="sub-badge">Netflix</span>
        <span className="sub-badge">Spotify</span>
        <span className="sub-badge">ChatGPT</span>
        <span className="sub-badge">YouTube</span>
        <span className="sub-badge">iCloud</span>
      </div>
      <div className="subscription-actions">
        <button className="action-btn">Управлять</button>
        <button className="action-btn secondary">Отключить автоплатеж</button>
      </div>
    </Card>
  )
}

export default SubscriptionsCard

