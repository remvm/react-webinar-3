import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      id: 0,
      title: '',
      description: '',
      price: 0,
      madeIn: {},
      edition: 0,
      category: ''
    }
  }

  load = async (id) => {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title, code),category(title)`);
    const json = await response.json();
    const result = json.result
    this.setState({
      ...this.getState(),
      id: result._id,
      title: result.title,
      description: result.description,
      price: result.price,
      madeIn: result.madeIn,
      edition: result.edition,
      category: result.category.title
    }, 'Загружены данные товара из АПИ');
  }
}

export default Product;
