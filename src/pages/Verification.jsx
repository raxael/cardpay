import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, FileText, Globe, ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'
import './Verification.css'

function Verification() {
  const navigate = useNavigate()
  const { completeVerification } = useApp()
  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const isFirstNameValid = firstName.length > 0 && /^[A-Za-z\s]+$/.test(firstName)
  const isLastNameValid = lastName.length > 0 && /^[A-Za-z\s]+$/.test(lastName)
  const canContinueStep1 = isFirstNameValid && isLastNameValid

  const documentTypes = [
    { id: 'passport', name: 'Гражданский паспорт', icon: FileText },
    { id: 'international', name: 'Заграничный паспорт', icon: Globe },
  ]

  const handleContinueStep1 = () => {
    if (canContinueStep1) {
      setStep(2)
    }
  }

  const handleContinueStep2 = () => {
    // Редирект на внешний сайт с KYC
    // window.location.href = 'https://kyc.example.com'
    
    // После завершения верификации помечаем как пройденную
    completeVerification()
    navigate('/')
  }

  const handleBack = () => {
    if (step === 1) {
      navigate('/')
    } else if (step === 2) {
      setStep(1)
    }
  }

  return (
    <div className="verification-page">
      <button className="back-btn" onClick={handleBack}>
        <ArrowLeft size={20} />
      </button>

      {step === 1 && (
        <div className="verification-step">
          <h1 className="verification-title">Укажите ваши данные</h1>
          <p className="verification-description">
            Убедитесь, что данные введены верно. Изменить эту информацию в
            дальнейшем нельзя.
          </p>

          <Card>
            <div className="input-group">
              <label className="input-label">Имя</label>
              <input
                type="text"
                className="verification-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ivan"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Фамилия</label>
              <input
                type="text"
                className="verification-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ivanov"
              />
            </div>

            <div className="validation-rules">
              <div className={`validation-item ${isFirstNameValid && isLastNameValid ? 'valid' : ''}`}>
                <CheckCircle size={18} />
                <span>Имя и фамилия должны быть латинские (Ivan Ivanov)</span>
              </div>
              <div className="validation-item valid">
                <CheckCircle size={18} />
                <span>
                  Информация должна совпадать с вашим паспортом или
                  международным ID.
                </span>
              </div>
            </div>
          </Card>

          <button
            className="continue-btn"
            onClick={handleContinueStep1}
            disabled={!canContinueStep1}
          >
            Продолжить
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="verification-step">
          <h1 className="verification-title">Подтвердите личность</h1>
          <p className="verification-description">
            Чтобы убедиться, что это действительно вы, необходимо загрузить
            документы подтверждающие вашу личность
          </p>

          <Card>
            <h3 className="doc-types-title">Типы поддерживаемых документов</h3>
            <div className="doc-types-list">
              {documentTypes.map((doc) => {
                const Icon = doc.icon
                return (
                  <div key={doc.id} className="doc-type-item">
                    <div className="doc-type-icon">
                      <Icon size={24} />
                    </div>
                    <span>{doc.name}</span>
                  </div>
                )
              })}
            </div>
          </Card>

          <button
            className="continue-btn"
            onClick={handleContinueStep2}
          >
            Продолжить
          </button>

          <p className="privacy-note">
            Нажимая кнопку «Продолжить», я разрешаю партнерам CardPay анализировать
            данные для проверки личности и соглашаюсь с{' '}
            <a href="#" className="privacy-link">
              Политикой конфиденциальности
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default Verification

