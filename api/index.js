// betolti az API endpoint lekezeloket
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import reservations from './reservations.js';
import users from './users.js';

const router = express.Router();

// testtel ellatott API hivast javascript objektumma alakitja
// pl. form POST kereskor a JSON-t javascript objektumma alakitja
router.use(bodyParser.json());

router.use('/routes', routes);

router.use('/reservations', reservations);

router.use('/users', users);

export default router;
