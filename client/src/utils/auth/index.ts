import decode from 'jwt-decode';

class AuthService {
  getProfile(): any {
    const token = this.getToken();
    if (token) {
      return decode(token);
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: any) {
    // Decode the token to get its expiration time that was set by the server
    const decoded: any = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    console.log('getToken function called');

    return localStorage.getItem('id_token');
  }

  login(idToken: any) {
    console.log('login function called');
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

const authService = new AuthService();

export default authService;