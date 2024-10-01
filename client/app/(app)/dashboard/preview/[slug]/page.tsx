'use client'

import LoadingAndErrorWrapper from '@/components/common/LoadingAndErrorWrapper'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { useGetSelectedTestimonials } from '@/hooks/useGetSelectedTestimonials'
import { Star, StarHalf, User } from 'lucide-react'
import Image from 'next/image'

export interface TestimonialProps {
  name: string
  companyName: string
  testimonialMessage?: string
  testimonialVideo?: string
  profileImage?: string
  rating?: number
}

const TestimonialCard = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading, error } = useGetSelectedTestimonials(params.slug)
  console.log(data)
  return (
    <LoadingAndErrorWrapper isLoading={isLoading} error={error}>
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((testimonial, index) => (
            <Card className="w-full max-w-md mx-auto" key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {testimonial.name}
                      </h3>
                      <StarRating rating={4} />
                    </div>
                  </div>
                  <div className='flex flex-col items-center mb-4'>
                    <p></p>
                    <p className="text-gray-600 text-xs text-wrap text-start my-auto">
                      ~ {testimonial.companyName} 
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {testimonial.testimonialMessage}
                </p>
                {testimonial.testimonialVideo ? (
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <video
                      src={testimonial.testimonialVideo}
                      controls
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                ) : !testimonial.testimonialVideo ? (
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <Image
                      src={'https://picsum.photos/200/100'}
                      alt={`${name}'s testimonial`}
                      width={400}
                      height={225}
                      layout="responsive"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </LoadingAndErrorWrapper>
  )
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          )
        } else if (i === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={i}
              className="w-5 h-5 fill-yellow-400 text-yellow-400"
            />
          )
        } else {
          return <Star key={i} className="w-5 h-5 text-gray-300" />
        }
      })}
    </div>
  )
}

export default TestimonialCard
