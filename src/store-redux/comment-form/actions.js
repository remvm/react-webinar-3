export default {

  open: (id) => {
    return {type: 'commentForm/open', payload: {id}};
  },


  close: () => {
    return {type: 'commentForm/close'}
  }
}
