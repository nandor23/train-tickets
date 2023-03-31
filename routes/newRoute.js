import { Router } from 'express';
import * as forms from '../controllers/newRouteController.js';

const router = Router();

// admin form kezelese
router.get('/', forms.renderNewRouteForm);
router.post('/', forms.submitNewRouteForm);

export default router;
