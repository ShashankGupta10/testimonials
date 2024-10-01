import { Request, Response } from "express";
import { prisma } from "../db/connect";

export const getStats = async (req: Request, res: Response) => {
    try {
        const spaces = await prisma.space.count({ where: { userId: req.body.userId } });
        const videoTestimonials = await prisma.testimonials.count({
            where: {
                Space: {
                    userId: req.body.userId
                },
                testimonialVideo: {
                    not: ""
                }
            }
        });
        const textTestimonials = await prisma.testimonials.count({
            where: {
                Space: {
                    userId: req.body.userId
                },
                testimonialVideo: ""
            }
        });
        const allSpaces = await prisma.space.findMany({
            where: {
                userId: req.body.userId
            },
            select: {
                testimonials: true,
                spaceName: true
            }
        });
        let bestSpace: { name: string, length: number } = {
            name: "",
            length: 0
        }
        allSpaces.forEach((space) => {
            if (!bestSpace) {
                bestSpace = { name: space.spaceName, length: space.testimonials.length };
            } else {
                if (space.testimonials.length > bestSpace.length) {
                    bestSpace = { name: space.spaceName, length: space.testimonials.length };
                }
            }
        });
        return res.status(200).json({
            success: true,
            data: {
                spaces: spaces,
                videoTestimonials: videoTestimonials,
                writtenTestimonials: textTestimonials,
                bestSpace: bestSpace.name
            }
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: error });
    }
}