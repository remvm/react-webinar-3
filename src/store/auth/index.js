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
        console.log('Login success:', result.result.user);
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

  logout() {
    localStorage.removeItem('authToken');
    this.setState({
      isAuthenticated: false,
      user: null,
      error: null,
      loading: false
    }, 'Выход из системы');
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
          this.setState({
            isAuthenticated: true,
            user,
            error: null,
            loading: false
          }, 'Автоматическая авторизация');
        } else {
          localStorage.removeItem('authToken'); // Удаляем токен при ошибке
          this.setState({
            isAuthenticated: false,
            user: null,
            error: null,
            loading: false
          });
        }
      } catch (error) {
        localStorage.removeItem('authToken'); // Удаляем токен при ошибке
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
