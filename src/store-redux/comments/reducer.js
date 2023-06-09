// Начальное состояние
const initialState = {
  list: [],
  count: 0,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, list: [], count: 0, waiting: true};

    case "comments/load-success":
      return { ...state, list: action.payload.data.list, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return { ...state, list: [], count: 0, waiting: false}; //@todo текст ошибки сохранить

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
