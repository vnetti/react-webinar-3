import StoreModule from "../module";

/**
 * Состояние пользователя
 */
class ProfileState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {},
      error: '',
    }
  }

  /**
   * Свой профиль
   * @returns {Promise<void>}
   */
  async getProfile() {
    const result = await fetch('/api/v1/users/self?fields=_id,profile(name,phone),email', {
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
      }, json.error.data.issues.map(issue => issue.message))
    } else {
      this.setState({
        ...this.getState(),
        data: {
          _id: json.result._id,
          name: json.result.profile.name,
          email: json.result.email,
          phone: json.result.profile.phone
        },
        error: '',
      }, 'Получен профиль')
    }
  }
}

export default ProfileState;
