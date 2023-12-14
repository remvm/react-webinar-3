import StoreModule from "../module";

class CategoryState extends StoreModule {

  initState() {
    return {
      list: []
    }
  }

  /**
   * Загрузка списка категорий
   * @param id {String}
   * @return {Promise<void>}
   */
  async loadCategories() {
    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      const result = json.result;
      const items = result.items.map(item => ({
        title: item.title,
        value: item._id,
        parent: item.parent ? item.parent._id : null
      }));
  
      function buildSelect(items, parent = null, level = 0) {
        let result = [];
        
        items.forEach(item => {
          if (item.parent === parent) {
            item.title = '- '.repeat(level) + item.title;
            result.push(item);
            result = [...result, ...buildSelect(items, item.value, level + 1)];
          }
        });
      
        return result;
      }
      
      const list = [{ title: 'Все', value: '' }, ...buildSelect(items)];
  
      this.setState({
        ...this.getState(),
        list: list
      });
  
    } catch (e) {
      this.setState({
        list: []
      });
    }
  }
  
}

export default CategoryState;
