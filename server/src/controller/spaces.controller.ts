import express from "express";
import { prisma } from "../db/connect";
import { spaceSchema } from "@appTypes";

export const createSpace = async (req: express.Request, res: express.Response) => {
    const body = req.body;
    const { data, success, error } = spaceSchema.safeParse(body);
    if (!success) return res.status(400).json(error.issues);
    
    const space = await prisma.space.create({
        data: data
    });
    res.status(200).json(space);
}