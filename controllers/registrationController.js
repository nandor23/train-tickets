import Ajv from 'ajv';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import registrationSchema from '../models/registration.js';
import * as usersDao from '../database/users.js';

const ajv = new Ajv();
const validateRegistration = ajv.compile(registrationSchema);

export const renderRegistrationForm = (_req, res) => {
  res.render('registration', { errorMessage: undefined });
};

export const submitRegistrationForm = async (req, res) => {
  const registration = {
    username: req.body.username,
    password: req.body.password,
    passwordAgain: req.body['confirm-password'],
  };
  try {
    const valid = validateRegistration(registration);
    if (!valid) {
      res.status(422).render('registration', { errorMessage: 'Invalid form input' });
      return;
    }
    const existsUser = await usersDao.existsUsername(registration.username);
    if (existsUser) {
      res.render('registration', { errorMessage: 'User already exists' });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registration.password, saltRounds);
    const user = {
      userId: nanoid(10),
      username: registration.username,
      password: hashedPassword,
      role: 'user',
    };
    usersDao.insertNewUser(user);
    res.redirect('/login');
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
};
