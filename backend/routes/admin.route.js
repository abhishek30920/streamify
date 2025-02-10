import { Router } from 'express';
import { createSong ,deleteSong,createAlbum,deleteAlbum,checkadmin} from '../contollers/admin.contoller.js';
import { protectRoute,reqadmin } from '../middleware/auth.middleware.js';
const router = Router();
console.log("here")

router.get("/check",checkadmin)
router.post("/songs",createSong); 
router.delete("/songs/:id",deleteSong);
router.post("/albums",createAlbum);
router.delete("/albums/:id",deleteAlbum);
export default router;
