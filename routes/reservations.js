import { Router } from 'express';
import { listReservations, submitBookingForm, listReservationsForUser } from '../controllers/reservationsController.js';

const router = Router();

router.get('/', listReservationsForUser);
router.get('/:id', listReservations);
router.post('/:id', submitBookingForm);

export default router;
