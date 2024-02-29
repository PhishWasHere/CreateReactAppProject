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
  return cookie.get(tokenName);
}

export const removeToken = () => {
  cookie.remove(tokenName);
}

type userType = {
  id: string;
  email: string;
  name: string;
}

export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  const user: userType = jwtDecode(token);
  return user;
}
