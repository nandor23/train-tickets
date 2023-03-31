import { Router } from 'express';
import { fillTable, filterTable } from '../controllers/mainController.js';

const router = Router();

router.get('/', fillTable);

router.post('/', filterTable);

export default router;
