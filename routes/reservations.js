import { Router } from 'express';
import { listReservations, submitBookingForm } from '../controllers/reservationsController.js';

const router = Router();

router.get('/:id', listReservations);
router.post('/:id', submitBookingForm);

export default router;
