'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
      name: 'Anna Deynah',
      companyName: 'UX Designer',
      testimonialMessage:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.',
      profileImage: 'https://picsum.photos/150',
      rating: 5,
    },
    {
      name: 'John Doe',
      companyName: 'Web Developer',
      testimonialMessage:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.',
      profileImage: 'https://picsum.photos/150',
      rating: 4,
    },
    {
      name: 'Maria Kate',
      companyName: 'Photographer',
      testimonialMessage:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
      testimonialVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
      rating: 5,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto">
      {data.map((testimonial, idx) => (
        <Card
          key={idx}
          className="bg-white text-black border-gray-200 rounded-xl shadow-lg p-6"
        >
          <CardHeader className="flex flex-col items-center space-y-4">
            {testimonial.testimonialVideo ? (
                <video
                  src={testimonial.testimonialVideo}
                  className="object-cover h-32"
                  loop
                  autoPlay
                  muted
                  controls
                />
            ) : (
              <Image
                src={testimonial.profileImage || 'https://picsum.photos/150'}
                alt={testimonial.name}
                width={128}
                height={128}
                className="rounded-full w-32 h-32 object-cover"
              />
            )}
            <CardTitle className="text-center text-lg font-bold">
              {testimonial.name}
            </CardTitle>
            <CardDescription className="text-center text-sm text-gray-500">
              {testimonial.companyName}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-gray-700 mb-4">
              {testimonial.testimonialMessage}
            </p>

            {/* Display star rating */}
            <div className="flex justify-center space-x-1">
              {Array.from({ length: testimonial.rating || 0 }).map((_, i) => (
                <Star key={i} className="text-yellow-400 h-5 w-5" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default TestimonialCard
