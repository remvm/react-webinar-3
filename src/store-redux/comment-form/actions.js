export default {

  open: (id, lastChild, parentLevel) => {
    return {type: 'commentForm/open', payload: {id, lastChild, parentLevel}};
  },


  close: () => {
    return {type: 'commentForm/close'}
  }
}
