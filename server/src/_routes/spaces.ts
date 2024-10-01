import { Router } from "express";
import { createSpace, getSpace, getSpaces, deleteSpace } from "../controller/spaces.controller";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.post("/createSpace", authMiddleware, createSpace);
router.get("/getSpaces", authMiddleware, getSpaces);
router.get("/getSpace/:spaceId", getSpace);
router.post("/delete", authMiddleware, deleteSpace);

export default router;