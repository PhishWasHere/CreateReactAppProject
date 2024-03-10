import jwt, {JwtPayload} from 'jsonwebtoken';
import { Request } from 'express';

const secret:string | undefined = process.env.JWT_SECRET || "secret";
const issuer = process.env.JWT_ISS || "localhost";
const expiration = '12h';

export const authMiddleware = async (ctx: Request) => {   
  let token = ctx.body.token || ctx.query.token || ctx.headers.authorization;
  
  if (ctx) { 
    token = token.split(' ').pop().trim();    
  }

  if (!token || !secret) return ctx.statusCode = 401;
  
  try { 
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as JwtPayload;    
    ctx.statusCode = 200;
    ctx.body.user = data;
  } catch {
    // console.log('Invalid token');
    ctx.statusCode = 401;
    ctx.body = { error: true, message: "Invalid token"};
  }
  
  return ctx;
}

export const signToken = ({ _id, email, username } : {_id: string, email?: string, username?: string, }) => { 
  if (!secret) return null;
  
  const payload = { _id, email, username}; 
  return jwt.sign({ data: payload }, secret, { issuer, expiresIn: expiration});
}