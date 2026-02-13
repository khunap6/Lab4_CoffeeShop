import Api from './Api'

export default {
  login(credentials) {
    return Api().post('login', credentials)
  },
  // optional
  register(credentials) {
    return Api().post('register', credentials)
  },
}
