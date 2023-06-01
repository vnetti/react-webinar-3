import StoreModule from "../module";

/**
 * Состояние для фильтрации каталога категорий
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
    }
  }

  /**
   * Получение категорий.
   * @return {Promise<void>}
   */
  async load() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`)
    const json = await response.json()
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены категории')
    this.sortByHierarchy()
  }

  sortByHierarchy() {
    const mapped = this.getState().list.map(category => {
      async function nesting(start = 0) {
        if (category.parent) {
          await fetch(`/api/v1/categories/${category.parent._id}?fields=_id,title,parent(_id)&limit=*`)
          return () => nesting(++start)
        } else return start
      }

      return {...category, nesting: nesting()}
    })

    this.setState({
      ...this.getState(),
      list: mapped
    })
  }
}

export default CategoriesState;
