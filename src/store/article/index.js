import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class ArticleState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
      error: ''
    });

    try {
      const res = await this.services.api.request({
        url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
      });

      // Товар загружен успешно
      this.setState({
        data: res.data.result,
        waiting: false
      }, 'Загружен товар из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data: {},
        waiting: false,
        error: e
      });
    }
  }
}

export default ArticleState;
