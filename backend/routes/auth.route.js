import { Router } from "express";
import { authCallback } from "../contollers/auth.controller.js";


const router = Router();

router.post("/callback", authCallback);

export default router;