export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}` 
        });
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  submit: (data) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/submit-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=_id,dateCreate,author(profile(name)),text,parent(_id,_type)`,
          method: 'POST',
          headers: {
            'accept': 'application/json'
          },
          body: JSON.stringify(data)
        });
        dispatch({type: 'comments/submit-success', payload: {data: res.data.result}});
      } catch (e) {
        dispatch({type: 'comments/submit-error'});
      }
    }
  },
}
