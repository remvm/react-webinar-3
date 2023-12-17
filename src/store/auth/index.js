import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    return {
      isAuthenticated: false,
      user: null,
      error: null,
      loading: false
    };
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    });
  }

  async login(login, password) {
    try {
      this.setState({
        ...this.getState(),
        loading: true
      })
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: login, password: password }),
      });
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('authToken', result.result.token);
        this.setState({
          isAuthenticated: true,
          user: result.result.user,
          error: null,
          loading: false
        }, 'Авторизация успешна');
      } else {
        const errorData = await response.json();
        this.setState({
          isAuthenticated: false,
          user: null,
          error: errorData.error.data.issues[0].message || 'Ошибка при авторизации',
          loading: false
        }, 'Ошибка при авторизации');
      }
    } catch (error) {
      this.setState({
        isAuthenticated: false,
        user: null,
        error: 'Ошибка при отправке запроса',
        loading: false
      }, 'Ошибка при отправке запроса');
    }
  }

  async logout() {
    try {
      const authToken = localStorage.getItem('authToken');
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': authToken,
          'Content-Type': 'application/json'
        }
      });
  
      localStorage.removeItem('authToken');
      this.setState({
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false
      }, 'Выход из системы успешен');
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
    }
  }
  

  async checkAuth() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        this.setState({
          ...this.getState(),
          loading: true
        })
        const response = await fetch('/api/v1/users/self?fields=*', {
          headers: {
            'X-Token': authToken,
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const user = await response.json();
          console.log(user)
          this.setState({
            isAuthenticated: true,
            user: user.result,
            error: null,
            loading: false
          }, 'Автоматическая авторизация');
        } else {
          await fetch('/api/v1/users/sign', {
            method: 'DELETE',
            headers: {
              'X-Token': authToken,
              'Content-Type': 'application/json'
            }
          });

          localStorage.removeItem('authToken');
          this.setState({
            isAuthenticated: false,
            user: null,
            error: null,
            loading: false
          });
        }
      } catch (error) {
        await fetch('/api/v1/users/sign', {
          method: 'DELETE',
          headers: {
            'X-Token': authToken,
            'Content-Type': 'application/json'
          }
        });

        localStorage.removeItem('authToken');
        this.setState({
          isAuthenticated: false,
          user: null,
          error: 'Ошибка при проверке авторизации',
          loading: false
        });
      }
    }
  }
}

export default AuthState;
