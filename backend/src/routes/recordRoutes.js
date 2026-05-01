import { Router } from 'express';
import { createRecord, listRecords } from '../controllers/recordController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', listRecords);
router.post('/', createRecord);

export default router;
