import { useState } from 'react'
import { Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'
import TransactionList from '../components/TransactionList'
import EmptyState from '../components/EmptyState'
import './History.css'

function History() {
  const { isActivated, transactions } = useApp()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  if (!isActivated || transactions.length === 0) {
    return (
      <div className="history">
        <EmptyState
          title="История пуста"
          description="После активации карты здесь будут отображаться все ваши транзакции"
          icon="history"
        />
      </div>
    )
  }

  const stats = transactions.reduce(
    (acc, group) => {
      group.items.forEach((item) => {
        if (item.amount > 0) {
          acc.incoming += item.amount
        } else {
          acc.outgoing += Math.abs(item.amount)
        }
      })
      return acc
    },
    { incoming: 0, outgoing: 0 }
  )

  return (
    <div className="history">
      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={filter === 'outgoing' ? 'active' : ''}
          onClick={() => setFilter('outgoing')}
        >
          Списания
        </button>
        <button
          className={filter === 'incoming' ? 'active' : ''}
          onClick={() => setFilter('incoming')}
        >
          Поступления
        </button>
      </div>

      <Card>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Поступления</span>
            <span className="stat-value positive">
              +${stats.incoming.toFixed(2)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Списания</span>
            <span className="stat-value negative">
              ${stats.outgoing.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      <TransactionList filter={filter} searchQuery={searchQuery} />

      <div className="info-text">
        Подайте онлайн-заявку в банк-эмитент прямо из операции — мы спросим
        детали, корректно оформим обращение и сопроводим дело до решения.
      </div>
    </div>
  )
}

export default History

