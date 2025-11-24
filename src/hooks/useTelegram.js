import { useEffect } from 'react'

export function useTelegram() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()
      tg.expand()
      
      // Настройка цветов темы Telegram
      if (tg.themeParams) {
        document.documentElement.style.setProperty(
          '--tg-theme-bg-color',
          tg.themeParams.bg_color || '#ffffff'
        )
        document.documentElement.style.setProperty(
          '--tg-theme-text-color',
          tg.themeParams.text_color || '#000000'
        )
        document.documentElement.style.setProperty(
          '--tg-theme-button-color',
          tg.themeParams.button_color || '#ff0000'
        )
        document.documentElement.style.setProperty(
          '--tg-theme-button-text-color',
          tg.themeParams.button_text_color || '#ffffff'
        )
      }
    }
  }, [])

  return {
    tg: window.Telegram?.WebApp,
    user: window.Telegram?.WebApp?.initDataUnsafe?.user,
    sendData: (data) => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify(data))
      }
    },
  }
}

