import { Router } from 'express';

import { protectRoute, reqadmin } from '../middleware/auth.middleware.js';
import { getStats } from '../contollers/stats.contoller.js'
const router = Router();


router.get("/", protectRoute,reqadmin,getStats)
export default router;
