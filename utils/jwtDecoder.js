import secret from '../config.js';
import jwt from 'jsonwebtoken';


export function decodeJWTToken(req) {
  const { token } = req.cookies;
  if (token) {
    try {
      const payload = jwt.verify(token, secret);
      return payload;
    } catch (error) {
      return undefined;
    }
  }
}
