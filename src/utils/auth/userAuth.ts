import {jwtDecode} from 'jwt-decode';
import cookie from "js-cookie";
import { UserType } from '../types'; 

const tokenName = "token";

export const validateToken = () => {
  const token = getToken();
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  
  if (decodedToken.exp! < Date.now() / 1000) {    
    cookie.remove(tokenName);
    return false;
  }
  return true
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

export const getUser = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const user: UserType = jwtDecode(token);

    const valid = validateToken();
    
    if (!valid) return null;

    return user;
  } catch (err) {
    return null;
  }
}
