import express from 'express';
import * as reservationsDao from '../database/reservations.js';

const router = express.Router();

router.delete('/:userId-:routeId', (req, res) => {
  const { userId } = req.params;
  const { routeId } = req.params;

  reservationsDao.deleteReservation(userId, routeId)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ message: `Error while deleting reservation with ID (${userId},${routeId}): ${err.message}` }));
});

router.post('/:userId-:routeId', (req, res) => {
  const { userId } = req.params;
  const { routeId } = req.params;

  reservationsDao.insertNewReservation(userId, routeId)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ message: `Error while inserting new reservation with ID (${userId},${routeId}): ${err.message}` }));
});

export default router;
