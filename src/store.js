import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, 
                  isModalOpen: false, 
                  cart: [], 
                  cartSum: 0 };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addItem(code) {
    let inCart = this.state.cart.find(el => el.code == code)
    let item = this.state.list.find(el => el.code == code)
    let newCart
    let newSum = this.state.cartSum + item.price;

    if (inCart) {
      newCart = this.state.cart.map(cartItem => {
        if (code === cartItem.code) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
    } else {
      newCart = [...this.state.cart, { ...item, quantity: 1 }];
      }
    this.setState({
      ...this.state,
      cart: newCart,
      cartSum: newSum
    });
    console.log(this.state.cart, this.state.cartSum)
  }

  showCart() {
    this.setState({ ...this.state, isModalOpen: true });
  }

  hideCart() {
    this.setState({ ...this.state, isModalOpen: false });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    let item = this.state.cart.find(el => el.code == code)
    let newSum = this.state.cartSum - item.price * item.quantity
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code),
      cartSum: newSum
    })
  }
}

export default Store;
