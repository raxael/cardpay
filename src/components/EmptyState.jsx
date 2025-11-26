import { CreditCard, History, CreditCard as CardIcon, Settings } from 'lucide-react'
import './EmptyState.css'

const iconMap = {
  card: CreditCard,
  history: History,
  cards: CardIcon,
  settings: Settings,
}

function EmptyState({ title, description, icon = 'card' }) {
  const Icon = iconMap[icon] || CreditCard

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={48} />
      </div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-description">{description}</p>
    </div>
  )
}

export default EmptyState

