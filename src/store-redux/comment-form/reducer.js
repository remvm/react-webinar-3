// Начальное состояние
const initialState = {
  id: '',
  lastChild: null,
  parentLevel: 0
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'commentForm/open':
      return {...state, id: action.payload.id, lastChild: action.payload.lastChild, parentLevel: action.payload.parentLevel};
    case 'commentForm/close':
      return initialState;
    default:
      return initialState;
  }
}

export default reducer;
