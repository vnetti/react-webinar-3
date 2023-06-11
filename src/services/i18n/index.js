import * as translations from "./translations";

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this._services = services;
    this._config = config;
    this._lang = this._config.language
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
   *
   * @returns {String} Текущая локаль
   */
  get lang() {
    return this._lang
  }

  /**
   * Функция для смены локали
   * @param lang {String} Язык для смены
   */
  set lang(lang) {
    if (lang !== this._lang) {
      this._lang = lang
      for (const listener of this.listeners) listener()
    }
  }

  /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(text, {lang, plural}) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined'){
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
}

export default I18nService;
