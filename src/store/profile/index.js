import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      user: null,
      loading: false,
      error: null
    };
  }

  async load(id) {
    const authToken = localStorage.getItem('authToken');
    try {
      this.setState({
        ...this.getState(),
        loading: true
      })
      const response = await fetch(`/api/v1/users/${id}?fields=*`, {
        headers: {
          'X-Token': authToken,
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const result = await response.json();
        this.setState({
          user: result.result,
          loading: false,
          error: false
        }, 'Профиль загружен');
      }
    } catch (error) {
      this.setState({
        user: null,
        error: error,
        loading: false
      }, 'Ошибка при отправке запроса');
    }
  }

  resetState() {
    this.setState(this.initState())
  }
}

export default ProfileState;
