import { Router } from 'express';
import { createReferralHandler } from '../controllers/referralController';

const router = Router();

router.post('/referrals', createReferralHandler);

export default router;
