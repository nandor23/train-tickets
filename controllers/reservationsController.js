import * as usersDao from '../database/users.js';
import * as routesDao from '../database/routes.js';
import * as reservationsDao from '../database/reservations.js';

export const listReservations = async (req, res) => {
  try {
    const [routeInfo, reservations] = await Promise.all([
      routesDao.getRouteInformationById(req.params.id),
      reservationsDao.getReservationsToRoute(req.params.id)]);
    res.render('reservations', {
      route: routeInfo,
      data: reservations,
      message: undefined,
    });
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
};

// bekuldott foglalas form kezelese
export const submitBookingForm = async (req, res) => {
  const routeId = req.params.id;
  const [routeInfo, reservations] = await Promise.all([
    routesDao.getRouteInformationById(routeId),
    reservationsDao.getReservationsToRoute(routeId),
  ]);

  const { username } = res.locals.payload;

  try {
    const [existsRoute, existsUsername] = await Promise.all([
      routesDao.existsRouteId(routeId),
      usersDao.existsUsername(username),
    ]);

    if (!existsRoute || !existsUsername) {
      res.status(422).render('reservations', {
        message: 'Could not book the ticket',
        route: routeInfo,
        data: reservations,
      });
      return;
    }
    const userId = await usersDao.getUserIdByUsername(username);
    const existsReservation = await reservationsDao.existsReservation(userId, routeId);

    if (existsReservation) {
      res.render('reservations', {
        message: `${username} has already booked a ticket to route with ID: ${routeId}`,
        route: routeInfo,
        data: reservations,
      });
      return;
    }
    reservationsDao.insertNewReservation(userId, routeId);
    // a jelenleg hozzaadott foglalas hozzaadasa a tombhoz,
    // igy nem kell az osszes foglalast ujra lekerni az adatbazisbol
    reservations.unshift({ userId, username });
    res.render('reservations', {
      message: 'Ticket booket successfully',
      route: routeInfo,
      data: reservations,
    });
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
};
