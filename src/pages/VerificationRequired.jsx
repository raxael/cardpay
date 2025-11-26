import { useNavigate } from 'react-router-dom'
import { User, CheckCircle } from 'lucide-react'
import Card from '../components/Card'
import './VerificationRequired.css'

function VerificationRequired() {
  const navigate = useNavigate()

  return (
    <div className="verification-required-page">
      <Card className="verification-card">
        <h1 className="verification-title">Верификация аккаунта</h1>
        <p className="verification-description">
          Для верификации аккаунта и получения доступа ко всем функциям, необходимо:
        </p>
        <div className="verification-list">
          <div className="verification-item">
            <User size={20} />
            <span>Укажите ваши данные</span>
          </div>
          <div className="verification-item">
            <CheckCircle size={20} />
            <span>Подтвердите личность</span>
          </div>
        </div>
        <button 
          className="verification-start-btn"
          onClick={() => navigate('/verification')}
        >
          Начать
        </button>
      </Card>
    </div>
  )
}

export default VerificationRequired

