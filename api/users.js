import express from 'express';
import * as usersDao from '../database/users.js';

const router = express.Router();

router.get('/:username', (req, res) => {
  const { username } = req.params;
  usersDao.existsUsername(username)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ message: `Error while checking if user ${username} exists: ${err.message}` }));
});

export default router;
