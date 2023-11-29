import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, isModalOpen: false, cart: [] };
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
    if (inCart) {
      const newCart = this.state.cart.map(item => {
        if (code === item.code) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
  
      this.setState({
        ...this.state,
        cart: newCart,
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {...item, quantity: 1}]
      })
    }
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
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code)
    })
  }
}

export default Store;
