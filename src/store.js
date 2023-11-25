/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.index = 1
    this.state.indexStore = initState.list.map(obj => obj.code)
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

  /**
   * Добавление новой записи
   */
  addItem() {
    if (this.state.indexStore.includes(this.state.index)) {
      this.state.index ++
      this.addItem()
    } else {
      this.setState({
        ...this.state,
        list: [...this.state.list, {code: this.state.index, title: 'Новая запись'}],
        indexStore: [...this.state.indexStore, this.state.index],
        index:  this.state.index + 1
      })
    }
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        } else {
          item.selected = false
        }
        return item;
      })
    })
  }

  selectCount(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code && item.selected === true) {
          if(!item.count) {
            item.count = 0
          }
          item.count ++
        }
        return item;
      })
    })
  }

  declOfNum = (number, titles) => {
    return titles[number % 10 > 1 && number % 10 < 5 && (number % 100 < 12 || number % 100 > 14) ? 1 : 0]
  };
}

export default Store;
