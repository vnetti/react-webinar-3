const isProduction = process.env.NODE_ENV === 'production';

/**
 * Настройки сервисов
 */
const config = {
  store: {
    // Логировать установку состояния?
    log: !isProduction,
    // Настройки модулей состояния
    modules: {
      session: {
        // Названия токена авторизации в АПИ
        tokenHeader: 'X-Token'
      }
    }
  },
  api: {
    baseUrl: ''
  },
  i18n: {
    defaultLanguage: 'ru',
    // Названия токена локали в АПИ
    tokenHeader: 'X-Lang'
  }
}

export default config;
