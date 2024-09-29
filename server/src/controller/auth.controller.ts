import { Request, Response } from "express";
import { prisma } from "../db/connect";
import bcrypt from "bcrypt";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { loginSchema, signupSchema } from "@appTypes";

export const signup = async (req: Request, res: Response) => {
    const body = req.body;
    const { data, success, error } = signupSchema.safeParse(body);
    if (!success) return res.status(400).json(error.issues);

    const password = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            username: data.username,
            password: password,
            name: data.name
        }
    });
    res.status(200).json(user);
}

export const login = async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);
    const { data, success, error } = loginSchema.safeParse(body);
    if (!success) return res.status(400).json(error.issues);
    const user = await prisma.user.findUnique({
        where: {
            username: data.username
        }
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: "Invalid password" });
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY!);
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
        secure: process.env.NODE_ENV === 'production'
    });
    res.status(200).json({ message: "Logged in successfully" });
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}

export const checkAuth = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Authenticated", success: true });
}