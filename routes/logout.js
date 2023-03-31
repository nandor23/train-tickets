import { Router } from 'express';
import logout from '../controllers/logoutController.js';

const router = new Router();

router.post('/', logout);

export default router;
