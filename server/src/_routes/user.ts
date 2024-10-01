import { Router } from "express";
import { getStats } from "../controller/user.controller";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.get("/stats", authMiddleware, getStats);

export default router;