import { SpaceType } from "@/types";
export type Testimonial = {
    id: String
    testimonialMessage: String
    testimonialVideo: String
    company: String
    name: String
}
export interface Spaces extends SpaceType {
    id: string
    testimonials: Testimonial[];
}