import { nanoid } from 'nanoid';
import Ajv from 'ajv';
import routeSchema from '../models/route.js';
import * as routesDao from '../database/routes.js';

// Ajv validalasi funkcio generalasa, csak egyszer lesz kopilalva, cachelve lesz
const ajv = new Ajv();
const validateRoute = ajv.compile(routeSchema);

// bekuldott uj jarat form kezelese
export const submitNewRouteForm = (req, res) => {
  // uj objektum letrehozasa
  const route = {
    routeId: nanoid(6),
    startingPoint: req.body['starting-point'],
    destination: req.body.destination,
    departureDay: req.body['departure-day'],
    departureTime: req.body['departure-time'],
    arrivalTime: req.body['arrival-time'],
    ticketPrice: Number(req.body['ticket-price'], 10),
    trainType: req.body['train-type'],
  };
  try {
    // megfelelo formatum ellenorzese
    const valid = validateRoute(route);
    if (!valid) {
      res.status(422).render('new_route', { errorMessage: 'Invalid form input' });
      return;
    }
    if (route.departureTime > route.arrivalTime) {
      res.status(422).render('new_route', { errorMessage: 'Invalid form input' });
      return;
    }
    routesDao.insertNewRoute(route);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
};

// uj jarat form betoltese
export const renderNewRouteForm = (_req, res) => {
  res.render('new_route', { errorMessage: undefined });
};
