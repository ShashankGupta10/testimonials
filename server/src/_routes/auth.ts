import { Router } from "express";
import { signup, login, logout, checkAuth } from "../controller/auth.controller";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", authMiddleware, checkAuth);

export default router; 