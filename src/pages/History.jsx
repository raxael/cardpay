import { useState } from 'react'
import { Search } from 'lucide-react'
import Card from '../components/Card'
import TransactionList from '../components/TransactionList'
import './History.css'

function History() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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
            <span className="stat-value positive">+$643.59</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Списания</span>
            <span className="stat-value negative">$497.91</span>
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

