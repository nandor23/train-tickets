import express from 'express';
import * as routesDao from '../database/routes.js';

const router = express.Router();

router.get('/:routeId', (req, res) => {
  const { routeId } = req.params;
  routesDao.getRouteInformationById(routeId)
    .then((route) => res.json(route))
    .catch((err) => res.status(500).json({ message: `Error while finding route with ID ${routeId}: ${err.message}` }));
});

router.delete('/:routeId', (req, res) => {
  const { routeId } = req.params;

  routesDao.deleteRoute(routeId)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ message: `Error while deleting route with ID ${routeId}: ${err.message}` }));
});

export default router;
