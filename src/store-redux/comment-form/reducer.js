// Начальное состояние
const initialState = {
  id: ''
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'commentForm/open':
      return {...state, id: action.payload.id};
    case 'commentForm/close':
      return initialState;
    default:
      return initialState;
  }
}

export default reducer;
