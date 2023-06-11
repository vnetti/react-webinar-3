import * as translations from "./translations";

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this._services = services;
    this._config = config;
    this.listeners = []
  }

  /**
   * Подписка слушателя на изменения языка
   * @param listener Слушатель
   * @returns {(function(): void)|*} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener)
    }
  }

  /**
   * @returns {String} Текущая локаль
   */
  get lang() {
    if (!this._lang) {
      // Устанавливаем локаль если ее еще нет. Выбранный юзером язык, либо язык пользовательского агента, либо дефолт язык из config.js
      this.lang = window.localStorage.getItem('lang')
        || window.navigator?.language
          .substring(0, window.navigator.language.search('-'))
          .toLowerCase()
        || this._config.defaultLanguage
    }
    return this._lang
  }

  /**
   * Функция для смены локали
   * @param lang {String} Язык для смены
   */
  set lang(lang) {
    if (lang !== this._lang) {
      this._lang = lang
      // Вызываем слушатели
      for (const listener of this.listeners) listener()
    }

    // Запоминаем выбранную локаль, чтобы локаль не сбрасывалась при новой сессии
    window.localStorage.setItem('lang', this.lang)

    // Устанавливаем локаль в АПИ
    this._services.api.setHeader(this._config.tokenHeader, this.lang);
  }

  /**
   * Перевод фразу по словарю
   * @param text {String} Текст для перевода
   * @param [option] {Object} Опции перевода
   * @param [option.lang] {String} Код языка
   * @param [option.plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(text, option) {
    let lang = this.lang
    if (typeof option?.lang !== "undefined") lang = option.lang

    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof option?.plural !== 'undefined'){
      const key = new Intl.PluralRules(lang).select(option.plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
}

export default I18nService;
