export default {
  /**
   * Загрузка комментов
   * @param id {String} - Идентификатор объекта
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?limit=*&search[parent]=${id}&fields=items(_id,_type,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count`
        });

        // Комменты загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: {list: res.data.result.items, count: res.data.result.count}}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  submit: (text, parentId, parentType) => {
    return async (dispatch, getState, services) => {

      try {
        const res = await services.api.request({
          method: 'POST',
          url: `/api/v1/comments?limit=*&fields=_id,_type,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          body: JSON.stringify({
            "text": text,
            "parent": {
              "_id": parentId,
              "_type": parentType
            }
          })
        })
        dispatch({type: 'comments/new', state: getState().comments, payload: {data: res.data.result}})
      } catch (e) {
        dispatch({type: 'comments/new-error', state: getState().comments, payload: {error: e}});
      }
    }
  }
}
