import StoreModule from "../module";

/**
 * Состояние пользователя
 */
class UserState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {},
      error: '',
      isAuth: null,
    }
  }

  /**
   * Сброс ошибки
   */
  resetError() {
    this.setState({
      ...this.getState(),
      error: ''
    }, 'Сброс ошибки UserState')
  }

  /**
   * Вход в систему
   * @param login {string} - Логин пользователя
   * @param password {string} - Пароль пользователя
   * @returns {Promise<void>}
   */
  async login(login, password) {
    const result = await fetch('/api/v1/users/sign?fields=_id,profile(name)', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({login, password})
    })
    const json = await result.json()

    if (!json.error) {
      this.setState({
        ...this.getState(),
        data: {
          _id: json.result.user._id,
          name: json.result.user.profile.name
        },
        error: '',
        isAuth: true
      }, 'Успешный вход')
      localStorage.setItem('X-Token', json.result.token)
    } else {
      this.setState({
        ...this.getState(),
        data: {},
        error: {
          _id: json.error.id,
          message: json.error.data.issues.map(issue => issue.message)
        },
        isAuth: false
      }, json.error.data.issues.map(issue => issue.message))
    }
  }

  /**
   * Выход из системы
   * @returns {Promise<void>}
   */
  async logout() {
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      'X-Token': localStorage.getItem('X-Token')
      }
    })

    this.setState({
      ...this.getState(),
      data: {},
      isAuth: false
    }, 'Успешный выход')
    localStorage.removeItem('X-Token')
  }

  /**
   * Получить пользователя, если залогинены
   * @returns {Promise<void>}
   */
  async getUser() {
    const result = await fetch('/api/v1/users/self?fields=_id,profile(name)', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('X-Token')
      }
    })
    const json = await result.json()

    if (json.error) {
      this.setState({
        ...this.getState(),
        error: {
          _id: json.error.id,
          message: json.error.data.issues.map(issue => issue.message)
        },
        isAuth: false
      }, json.error.data.issues.map(issue => issue.message))
    } else {
      this.setState({
        ...this.getState(),
        data: {
          _id: json.result._id,
          name: json.result.profile.name
        },
        error: '',
        isAuth: true
      }, 'Получен пользователь')
    }
  }
}

export default UserState;
