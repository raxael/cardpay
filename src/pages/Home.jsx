import { useNavigate } from 'react-router-dom'
import { PlusCircle, ArrowRightLeft, Repeat, History } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BankCard from '../components/BankCard'
import BalanceCard from '../components/BalanceCard'
import SubscriptionsCard from '../components/SubscriptionsCard'
import ExpensesChart from '../components/ExpensesChart'
import EmptyState from '../components/EmptyState'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const { isActivated, activateAccount, cards } = useApp()

  if (!isActivated) {
    return (
      <div className="home">
        <EmptyState
          title="Добро пожаловать!"
          description="Выпустите карту, чтобы начать пользоваться всеми функциями приложения"
          icon="card"
        />
        <button 
          className="activate-btn" 
          onClick={() => navigate('/card-issue', { state: { returnPath: '/' } })}
        >
          Выпустить карту
        </button>
      </div>
    )
  }

  return (
    <div className="home">
      {cards.length > 0 && <BankCard returnPath="/" />}
      
      <div className="nav-buttons">
        <button onClick={() => navigate('/topup')} className="nav-btn">
          <PlusCircle size={24} />
          <span>Пополнить</span>
        </button>
        <button className="nav-btn">
          <ArrowRightLeft size={24} />
          <span>Перевести</span>
        </button>
        <button className="nav-btn">
          <Repeat size={24} />
          <span>Подписки</span>
        </button>
        <button onClick={() => navigate('/history')} className="nav-btn">
          <History size={24} />
          <span>История</span>
        </button>
      </div>

      <BalanceCard />
      <SubscriptionsCard />
      <ExpensesChart />
    </div>
  )
}

export default Home

