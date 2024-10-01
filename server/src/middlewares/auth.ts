import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/connect";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["token"];
    if (!token) return res.status(200).json({ message: "Unauthenticated user", success: false });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as unknown as { userId: string };
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });
        if (!user) return res.status(200).json({ message: "User not found", success: false });
        req.body.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(200).json({ message: "Invalid token", success: false });
    }
}