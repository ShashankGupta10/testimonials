import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["token"];
    if (!token) return res.status(400).json({ message: "Unauthenticated user" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as unknown as { userId: string };
        req.body.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
}