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
    const product = this.state.list.find(item => item.code === code)
    const cart = this.state.cart
    const sameItem = cart.items.findIndex(item => item.code === code) >= 0

    this.setState({
      ...this.state,
      cart: {
        ...cart,
        items: sameItem
          ? cart.items.map(item => item.code === code ? {...item, count: item.count + 1} : item)
          : [...cart.items, {code: code, title: product.title, count: 1, price: product.price}],
        totalPrice: cart.totalPrice + product.price || product.price,
        itemsCount: cart.items.length > 0
          ? sameItem ? cart.items.length : cart.items.length + 1
          : 1
      }
    })
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteItemFromCart(code) {
    const product = this.state.cart.items.find(item => item.code === code)
    const cart = this.state.cart

    this.setState({
      ...this.state,
      // Новая корзина, в котором не будет удаляемой позиции
      cart: {
        ...cart,
        items: cart.items.filter(item => item.code !== code),
        totalPrice: cart.totalPrice - product.price * product.count,
        itemsCount: cart.itemsCount - 1
      }
    })
  };
}

export default Store;
