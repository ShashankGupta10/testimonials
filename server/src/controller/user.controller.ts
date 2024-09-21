import { prisma } from "../db/connect";
import { RegisterUserType } from "@appTypes";
import express from "express";

export const createUser = async (req: express.Request, res: express.Response) => {
    const body: RegisterUserType = req.body;
    const user = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password,
            name: body.name,
        }
    });
    res.status(200).json(user);
}

export const clerkWebhook = async (req: express.Request, res: express.Response) => {
    const body = req.body;
    const name = body.data.first_name + " " + body.data.last_name;
    const username = body.data.username;
    try {
        const user = await prisma.user.create({
            data: {
                name,
                username,
            }
        })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}