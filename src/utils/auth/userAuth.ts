import {jwtDecode} from 'jwt-decode';
import cookie from "js-cookie";

const tokenName = "token";

export const validateToken = () => {
  const token = getToken();
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  
  if (decodedToken.exp! < Date.now() / 1000) {
    cookie.remove(tokenName);
    return true;
  }
  return false
}

export const setToken = (token: string) => {
  removeToken();
  cookie.set(tokenName, token);
}

export const getToken = () => {
  const token = cookie.get(tokenName);  
  return token;
}

export const removeToken = () => {
  cookie.remove(tokenName);
}

type userType = {
  data: {
    username: string;
  };
  id: string;
  email: string;
  username: string;
}

export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  const user: userType = jwtDecode(token);
  return user;
}
