import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      totalItems: 0
    }
  }

  load = async (page) => {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(page - 1) * 10}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      currentPage: page
    }, 'Загружены товары из АПИ');
  }

  async loadAll() {
    const response = await fetch('/api/v1/articles?limit=1000&fields=items()');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      totalItems: json.result.items.length
    }, 'Загружены все товары из АПИ');
  }
}

export default Catalog;
