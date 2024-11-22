import { Request, Response } from "express";
import { prisma } from "../db/connect";

export const createTestimonial = async (req: Request, res: Response) => {
    const body = req.body;
    const testimonial = await prisma.testimonials.create({
        data: {
            name: body.name,
            companyName: body.companyName,
            testimonialVideo: body.testimonialVideo,
            testimonialMessage: body.testimonialMessage,
            spaceId: body.spaceId,
            rating: body.rating
        }
    });
    res.status(200).json({ success: true, data: testimonial });
}

export const getTestimonials = async (req: Request, res: Response) => {
    const spaceId = req.query.spaceId as string;
    const testimonials = await prisma.testimonials.findMany({
        where: {
            spaceId
        }
    });
    res.status(200).json({ success: true, data: testimonials });
}

export const selectTestimonials = async (req: Request, res: Response) => {
    const body = req.body;
    await prisma.testimonials.updateMany({
        where: {
            spaceId: body.spaceId,
            id: {
                in: body.selectedTestimonials,
            }
        },
        data: {
            selected: true
        }
    });

    await prisma.testimonials.updateMany({
        where: {
            spaceId: body.spaceId,
            id: {
                notIn: body.selectedTestimonials,
            }
        },
        data: {
            selected: false
        }
    });

    res.status(200).json({ success: true, message: "Testimonials selected successfully" });
}

export const selectedTestimonials = async (req: Request, res: Response) => {
    const spaceId = req.query.spaceId as string;
    const testimonials = await prisma.testimonials.findMany({
        where: {
            spaceId,
            selected: true
        },
    }); 
    res.status(200).json({ success: true, data: testimonials });
}