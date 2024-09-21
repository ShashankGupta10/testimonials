import { Router } from "express";
import { clerkWebhook, createUser } from "../controller/user.controller";
const router = Router();

router.post("/register", createUser);
router.post("/clerk_create_user", clerkWebhook);

export default router;