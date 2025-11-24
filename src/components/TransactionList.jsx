import { Music, Film, Bot, Coins, ShoppingBag, Coffee, Zap, Gamepad2, TrendingUp } from 'lucide-react'
import Card from './Card'
import './TransactionList.css'

const getTransactionIcon = (title, category) => {
  const titleLower = title.toLowerCase()
  
  if (titleLower.includes('spotify') || titleLower.includes('music')) {
    return <Music size={20} />
  }
  if (titleLower.includes('netflix') || titleLower.includes('video') || titleLower.includes('film')) {
    return <Film size={20} />
  }
  if (titleLower.includes('chatgpt') || titleLower.includes('chat') || titleLower.includes('ai')) {
    return <Bot size={20} />
  }
  if (titleLower.includes('пополнение') || titleLower.includes('usdt') || titleLower.includes('crypto') || titleLower.includes('trc') || titleLower.includes('ton')) {
    return <Coins size={20} />
  }
  if (titleLower.includes('google ads') || titleLower.includes('реклама') || titleLower.includes('ads')) {
    return <TrendingUp size={20} />
  }
  if (titleLower.includes('coffee') || titleLower.includes('кафе')) {
    return <Coffee size={20} />
  }
  if (titleLower.includes('game') || titleLower.includes('игра')) {
    return <Gamepad2 size={20} />
  }
  if (category === 'Entertainment') {
    return <Zap size={20} />
  }
  if (category === 'Crypto') {
    return <Coins size={20} />
  }
  
  return <ShoppingBag size={20} />
}

const transactions = [
  {
    date: '05 марта',
    items: [
      {
        id: 1,
        title: 'Spotify',
        time: '13:20',
        category: 'Entertainment',
        amount: -9.99,
        canDispute: true,
      },
      {
        id: 2,
        title: 'Пополнение',
        time: '12:02',
        category: 'Crypto',
        amount: 200.0,
      },
    ],
  },
  {
    date: '06 марта',
    items: [
      {
        id: 3,
        title: 'Netflix',
        time: '10:15',
        category: 'Entertainment',
        amount: -15.99,
        canDispute: true,
      },
      {
        id: 4,
        title: 'ChatGPT',
        time: '09:30',
        category: 'Services',
        amount: -20.0,
        canDispute: true,
      },
    ],
  },
]

function TransactionList({ filter, searchQuery }) {
  const filteredTransactions = transactions.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'outgoing' && item.amount < 0) ||
        (filter === 'incoming' && item.amount > 0)
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    }),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="transaction-list">
      {filteredTransactions.map((group, idx) => (
        <div key={idx} className="transaction-group">
          <div className="transaction-date">{group.date}</div>
          <Card className="transaction-group-card">
            {group.items.map((item, itemIdx) => (
              <div key={item.id} className="transaction-item">
                <div className="transaction-content">
                  <div className="transaction-icon">
                    {getTransactionIcon(item.title, item.category)}
                  </div>
                  <div className="transaction-main">
                    <div className="transaction-title">{item.title}</div>
                    <div className="transaction-meta">
                      {item.time} • {item.category}
                    </div>
                  </div>
                  <div className="transaction-amount-section">
                    <div
                      className={`transaction-amount ${
                        item.amount > 0 ? 'positive' : 'negative'
                      }`}
                    >
                      {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
                    </div>
                    {item.canDispute && (
                      <a href="#" className="dispute-link">Оспорить</a>
                    )}
                  </div>
                </div>
                {itemIdx < group.items.length - 1 && (
                  <div className="transaction-divider"></div>
                )}
              </div>
            ))}
          </Card>
        </div>
      ))}
    </div>
  )
}

export default TransactionList

