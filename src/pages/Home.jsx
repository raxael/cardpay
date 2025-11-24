import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Apple, PlusCircle, ArrowRightLeft, Repeat, History } from 'lucide-react'
import Card from '../components/Card'
import BankCard from '../components/BankCard'
import BalanceCard from '../components/BalanceCard'
import SubscriptionsCard from '../components/SubscriptionsCard'
import ExpensesChart from '../components/ExpensesChart'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <BankCard />
      
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
      
      <button className="activate-btn">Активировать карту</button>
    </div>
  )
}

export default Home

