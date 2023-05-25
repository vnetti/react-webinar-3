import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      isLoading: null,
      item: {}
    }
  }

  clearProduct() {
    this.setState({
      ...this.getState(),
      isLoading: null,
      item: {}
    }, 'Очищен товар')
  }

  setIsLoading(status = true) {
    this.setState({
      ...this.getState(),
      isLoading: status
    }, 'Изменен статус product/isLoading')
  }

  async getById(id) {
    this.setIsLoading()
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       item: json.result
    }, 'Загружен товар из АПИ по ID');
    this.setIsLoading(false)
  }
}

export default Product;
