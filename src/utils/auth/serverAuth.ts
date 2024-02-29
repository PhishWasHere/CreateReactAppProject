import jwt, {JwtPayload} from 'jsonwebtoken';
import { Request } from 'express';

const secret:string | undefined = process.env.JWT_SECRET || "secret";
const issuer = process.env.JWT_ISS || "localhost";
const expiration = '12h';

export const authMiddleware = async ({ req }: {req: Request}) => { 
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) { 
    token = token.split(' ').pop().trim();
  }

  if (!token || !secret) return req.statusCode = 500;
  
  try { 
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as JwtPayload;
    req.body.user = data;
    return req;
  } catch {
    console.log('Invalid token');
    req.statusCode = 401;
    req.body = { error: true, message: "Invalid token"};
    return req;
  }

}

export const signToken = ({ _id, email, username } : {_id: string, email?: string, username?: string, }) => { 
  if (!secret) return;
  
  const payload = { _id, email, username}; 
  return jwt.sign({ data: payload }, secret, { issuer, expiresIn: expiration});
}