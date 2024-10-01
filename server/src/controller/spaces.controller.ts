import { Request, Response } from "express";
import { prisma } from "../db/connect";
import { spaceSchema } from "../types";

export const createSpace = async (req: Request, res: Response) => {
    const body = req.body;
    const { data, success, error } = spaceSchema.safeParse(body);
    if (!success) return res.status(400).json(error.issues);

    const space = await prisma.space.create({
        data: {
            ...data,
            userId: body.userId
        }
    });
    res.status(200).json(space);
}

export const getSpaces = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const spaces = await prisma.space.findMany({
        where: {
            userId: userId,
        },
        include: {
            testimonials: true
        }
    });
    res.status(200).json(spaces);
}

export const getSpace = async (req: Request, res: Response) => {
    const spaceId = req.params.spaceId;
    const space = await prisma.space.findUnique({
        where: {
            id: spaceId
        }
    })
    res.status(200).json(space);
}

export const deleteSpace = async (req: Request, res: Response) => {
    const spaceId = req.body.spaceId;
    await prisma.space.delete({
        where: {
            id: spaceId
        }
    });
    res.status(200).json({ success: true, message: "Space deleted successfully" });
}