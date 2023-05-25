import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      isLoading: null,
      list: [],
      currentPage: 1
    }
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    }, `Изменена страница пагинации на ${page}`)
    this.load()
  }

  async load() {
    const page = this.getState().currentPage
    this.setIsLoading()
    const response = await fetch(`/api/v1/articles?limit=10&${page <= 1 ? '' : `skip=${page - 1}0&`}fields=items(_id,%20title,%20price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalProducts: json.result.count,
    }, `Загружены товары из АПИ - страница ${page}`);
    this.setIsLoading(false)
  }
}

export default Catalog;
