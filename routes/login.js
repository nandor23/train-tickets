import { Router } from 'express';
import { renderLoginForm, submitLoginForm } from '../controllers/loginController.js';

const router = new Router();

router.get('/', renderLoginForm);
router.post('/', submitLoginForm);

export default router;
