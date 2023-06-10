// Начальное состояние
const initialState = {
  list: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
  error: ''
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, list: [], count: 0, waiting: true};

    case "comments/load-success":
      return { ...state, list: action.payload.data.list, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return { ...state, list: [], count: 0, waiting: false, error: action.payload.error};

    case "comments/new":
      return { ...action.state, list: [...action.state.list, action.payload.data], count: action.state.count + 1};

    case "comments/new-error":
      return { ...action.state, error: action.payload.error};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
