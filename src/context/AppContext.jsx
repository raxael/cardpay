import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [isVerified, setIsVerified] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [cards, setCards] = useState([])
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(null)
  const [subscriptions, setSubscriptions] = useState([])

  const activateAccount = () => {
    setIsActivated(true)
    
    // Заполняем временными данными
    setCards([
      {
        id: 1,
        number: '0000 0000 0000 0000',
        expiryDate: '12/28',
        type: 'Visa',
        isActive: true,
        isPrimary: false,
        name: 'Платженая система * 6543',
        purpose: 'Реклама',
      },
    ])

    setBalance({
      amount: 1234.56,
      limit: 920,
      maxLimit: 5000,
      isHidden: false,
    })

    setTransactions([
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
    ])

    setSubscriptions([
      { name: 'Netflix', amount: 15.99, nextCharge: '03 Oct' },
      { name: 'Spotify', amount: 9.99, nextCharge: '05 Oct' },
      { name: 'ChatGPT', amount: 20.0, nextCharge: '10 Oct' },
      { name: 'YouTube', amount: 11.99, nextCharge: '15 Oct' },
      { name: 'iCloud', amount: 9.99, nextCharge: '20 Oct' },
    ])
  }

  const deactivateAccount = () => {
    setIsActivated(false)
    setCards([])
    setTransactions([])
    setBalance(null)
    setSubscriptions([])
  }

  const completeVerification = () => {
    setIsVerified(true)
  }

  return (
    <AppContext.Provider
      value={{
        isVerified,
        isActivated,
        cards,
        transactions,
        balance,
        subscriptions,
        activateAccount,
        deactivateAccount,
        completeVerification,
        setBalance,
        setCards,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

