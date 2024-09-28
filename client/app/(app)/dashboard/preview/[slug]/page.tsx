'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Star } from 'lucide-react'
import Image from 'next/image'

interface TestimonialProps {
  name: string
  companyName: string
  testimonialMessage?: string
  testimonialVideo?: string
  profileImage?: string
  rating?: number
}

const TestimonialCard = () => {
  const data: TestimonialProps[] = [
    {
      name: 'John Doe',
      companyName: 'Google',
      testimonialMessage:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      testimonialVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
      profileImage: 'https://picsum.photos/50/50',
      rating: 5,
    },
    {
      name: 'Jane Doe',
      companyName: 'Facebook',
      testimonialMessage:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      profileImage: 'https://picsum.photos/50',
      rating: 4,
    },
  ]

  return data.map((testimonial, idx) => (
    <Card
      key={idx}
      className="bg-white text-black border-gray-200 rounded-xl shadow-lg p-6 mb-8"
    >
      <CardHeader className="space-y-4">
        {/* Display the star rating */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: testimonial.rating || 0 }).map((_, i) => (
            <Star key={i} className="text-yellow-400 h-5 w-5" />
          ))}
        </div>

        {/* Testimonial message */}
        <CardContent className="space-y-2">
          {testimonial.testimonialVideo ? (
            <AspectRatio ratio={16 / 9}>
              <video
                controls
                src={testimonial.testimonialVideo}
                className="rounded-lg w-full h-auto"
              />
            </AspectRatio>
          ) : (
            <p className="text-lg text-gray-800">
              {testimonial.testimonialMessage}
            </p>
          )}
        </CardContent>

        {/* Profile image and name */}
        <div className="flex items-center space-x-4 mt-4">
          <Image
            src={testimonial.profileImage || 'https://picsum.photos/50'}
            alt={testimonial.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <CardTitle className="font-semibold text-lg text-gray-900">
              {testimonial.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {testimonial.companyName}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  ))
}

export default TestimonialCard
