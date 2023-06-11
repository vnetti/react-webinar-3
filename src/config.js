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
        // Названия токена в АПИ
        tokenHeader: 'X-Token'
      }
    }
  },
  api: {
    baseUrl: ''
  },
  i18n: {
    language: window.navigator?.language
        .substring(0, window.navigator.language.search('-'))
        .toLowerCase() || 'ru'
  }
}

export default config;
