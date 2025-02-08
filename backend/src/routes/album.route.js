import { Router } from 'express';
import { getAllAlbums, getAlbumById } from '../contollers/album.contoller.js';

const router = Router();

 router.get("/", getAllAlbums);
 router.get("/:id", getAlbumById);

export default router;