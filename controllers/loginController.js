import Ajv from 'ajv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginSchema from '../models/login.js';
import * as usersDao from '../database/users.js';
import secret from '../config.js';

const ajv = new Ajv();
const validateLogin = ajv.compile(loginSchema);

export const renderLoginForm = (_req, res) => {
  res.render('login', { errorMessage: undefined });
};

export const submitLoginForm = async (req, res) => {
  const login = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const valid = validateLogin(login);
    if (!valid) {
      res.status(422).render('login', { errorMessage: 'Invalid form input' });
      return;
    }
    const user = await usersDao.getUser(login.username);

    // nem letezik a felhasznalo
    if (user === undefined) {
      res.render('login', { errorMessage: 'The username or password is incorrect' });
      return;
    }
    // a hatterben minden salt-ra vegigprobalja, futasi ideje nem vevodik eszre
    // brute force jelszo feltorest viszont lelassitja
    const match = await bcrypt.compare(login.password, user.password);
    if (!match) {
      res.render('login', { errorMessage: 'The username or password is incorrect' });
      return;
    }
    // token letrehozasa
    const token = jwt.sign({
      userId: user.userId,
      username: user.username,
      role: user.role,
    }, secret);
    // cookie letrehozasa
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
};
