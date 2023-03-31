import { Router } from 'express';
import { renderRegistrationForm, submitRegistrationForm } from '../controllers/registrationController.js';

const router = new Router();

router.get('/', renderRegistrationForm);
router.post('/', submitRegistrationForm);

export default router;
