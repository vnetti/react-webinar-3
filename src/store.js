/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToCart(code) {
    const itemIndex = this.state.list.findIndex(item => item.code === code)

    if (this.state.cart.findIndex(item => item.code === code) >= 0) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item => {
          if (item.code === code) {
            item.count ++
            return item
          }
          return item
        })
      })
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {code: code, title: this.state.list[itemIndex].title, count: 1, price: this.state.list[itemIndex].price}]
      })
    }
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой позиции
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };
}

export default Store;
