import {jwtDecode} from 'jwt-decode';
import cookie from "js-cookie";
import { setContext } from "@apollo/client/link/context";
import { ApolloLink } from '@apollo/client';

export const validateToken = () => {
  const token = getToken();
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  
  if (decodedToken.exp! < Date.now() / 1000) {
    cookie.remove("token");
    return true;
  }
  return false
}

export const setToken = (token: string) => {
  removeToken();
  cookie.set("token", token);
}

export const getToken = () => {
  return cookie.get("token");
}

export const removeToken = () => {
  cookie.remove("token");
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

export const clientAuthMiddleware = new ApolloLink((operation, forward) => {
  const token = getToken();
  operation.setContext(({ headers = {} }) => ({
     headers: {
       ...headers,
       authorization: token ? `Bearer ${token}` : "",
     },
  }));
 
  return forward(operation);
});
