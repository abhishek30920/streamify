import { Router } from 'express';
import { getAllSongs,getFeaturedSongs ,getmadeForUSongs,getTrendingSongs } from '../contollers/songs.controller.js';
import { protectRoute, reqadmin } from '../middleware/auth.middleware.js';
import { get } from 'mongoose';
const router = Router();


router.get("/",protectRoute,reqadmin,  getAllSongs)
router.get("/featured",getFeaturedSongs)
router.get("/MadeForYou",getmadeForUSongs)
router.get("/trending",getTrendingSongs)
export default router;
