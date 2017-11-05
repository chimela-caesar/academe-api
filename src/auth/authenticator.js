class Auth {
  static loggedIn() {
    return sessionStorage.getItem('user');
  }

  static logOut() {
    sessionStorage.removeItem('user');
  }

  static setUser(user) {
    sessionStorage.setItem('user', user);
  }
}

export default Auth;