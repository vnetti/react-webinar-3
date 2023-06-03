import StoreModule from "../module";

/**
 * Состояние категорий товаров для фильтра
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: []
    }
  }

  /**
   * Загрузка категорий
   * @returns {Promise<void>}
   */
  async loadCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`)
    const json = await response.json()

    this.setState({
      ...this.getState(),
      list: this.#sortCategories(json.result.items)
    }, 'Загружены категории')
  }

  /**
   * Сортировака категорий и добавление обозначение вроженности
   * @param initCategories {Object[]} - начальный массив категорий
   * @returns {Object[]} - отсортированный массив категорий
   */
  #sortCategories(initCategories) {
    // Подготавливаем массив категорий, считаем вложенность для каждого элемента
    const mapped = initCategories.map(category => {
      let count = 0
      function nestingCount(item) {
        if (item.parent) {
          const parent = initCategories.find(foundItem => foundItem._id === item.parent._id)
          return nestingCount(parent, count++)
        } else return count
      }
      return {
        ...category,
        nesting: nestingCount(category)
      }
    })

    // Создаем коллекцию уникальных категорий
    const sortedCategories = new Set()
    // Функция сортировки категорий и добавление их в Set
    function sortCategories(categories) {
      categories.forEach( category => {
        sortedCategories.add(category)
        const children = mapped.filter(item => item.parent?._id === category._id)
        if (children.length) sortCategories(children)
      })
    }
    sortCategories(mapped)

    return Array.from(sortedCategories)
  }
}

export default CategoriesState;
