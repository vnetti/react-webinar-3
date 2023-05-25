/**
 * Базовый класс для модулей хранилища
 * Для гурппировки действий над внешним состоянием
 */
class StoreModule {

  constructor(store, name) {
    this.store = store;
    this.name = name;
  }

  initState() {
    return {}
  }

  getState() {
    return this.store.getState()[this.name];
  }

  setState(newState, description = 'setState') {
    this.store.setState({
      ...this.store.getState(),
      [this.name]: newState
    }, description)
  }

  setIsLoading(status = true) {
    this.setState({
      ...this.getState(),
      isLoading: status
    }, `Изменен статус ${this.name}/isLoading на ${status}`)
  }

}

export default StoreModule;
