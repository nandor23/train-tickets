import jwt from 'jsonwebtoken';
import secret from '../config.js';

export function decodeJWTToken(req, res, next) {
  res.locals.payload = undefined;
  const { token } = req.cookies;
  if (token) {
    try {
      const payload = jwt.verify(token, secret);
      res.locals.payload = payload;
    } catch (error) {
      res.clearCookie('token');
      res.send(401);
      return;
    }
  }
  next();
}

export function decodeJWTTokenPopup(req, res, next) {
  res.locals.payload = undefined;
  const { token } = req.cookies;
  if (token) {
    try {
      const payload = jwt.verify(token, secret);
      res.locals.payload = payload;
    } catch (error) {
      res.clearCookie('token');
      res.send(401);
      return;
    }
  } else {
    res.render('popup');
    return;
  }
  next();
}
