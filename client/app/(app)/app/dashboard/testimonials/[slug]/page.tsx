'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGetTestimonials } from '@/hooks/useGetTestimonials'
import { Card, CardContent } from '@/components/ui/card'
import { useSelectTestimonials } from '@/hooks/useSelectTestimonials'
import { Star, StarHalf, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import LoadingAndErrorWrapper from '@/components/common/LoadingAndErrorWrapper'
import { Button } from '@/components/ui/button'

const Page = () => {
  const { slug } = useParams()
  const { mutate } = useSelectTestimonials()
  const {
    data: testimonials,
    isLoading,
    error,
  } = useGetTestimonials(slug as string)
  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([])

  useEffect(() => {
    console.log('RUNNING')
    setSelectedTestimonials(
      testimonials
        ?.filter((t) => t.selected)
        .map((t) => t.id)
        .filter((id): id is string => id !== undefined) || [],
    )
  }, [testimonials])

  const handleSelectTestimonial = (id: string) => {
    if (selectedTestimonials.includes(id)) {
      console.log(selectedTestimonials)
      setSelectedTestimonials(selectedTestimonials.filter((t) => t !== id))
    } else if (selectedTestimonials.length < 3) {
      console.log(selectedTestimonials)
      setSelectedTestimonials([...selectedTestimonials, id])
    }
  }

  const handleSubmit = () => {
    console.log('Selected Testimonials:', selectedTestimonials)
    mutate({ spaceId: slug as string, selectedTestimonials })
  }

  return (
    <LoadingAndErrorWrapper isLoading={isLoading} error={error}>
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.length === 0 && (
            <div className="col-span-3 my-auto text-center text-gray-500">
              No testimonials found :(
            </div>
          )}
          {testimonials?.map((testimonial, index) => (
            <Card
              className={`w-full max-w-md mx-auto ${selectedTestimonials.find((test) => test === testimonial.id) ? 'ring-2 ring-indigo-600' : ''}`}
              key={index}
            >
              <CardContent className="p-6">
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
                <div className="flex items-center mt-4 gap-3">
                  <RadioGroup>
                    <RadioGroupItem
                      id={`radio-${testimonial.id}`}
                      value={'default'}
                      checked={selectedTestimonials.includes(testimonial.id!)}
                      onClick={() => handleSelectTestimonial(testimonial.id!)}
                      disabled={
                        !selectedTestimonials.includes(testimonial.id!) &&
                        selectedTestimonials.length >= 3
                      }
                    />
                  </RadioGroup>

                  <Label
                    htmlFor={`radio-${testimonial.id}`}
                    className="text-sm text-gray-500 cursor-pointer flex items-center"
                  >
                    Select this testimonial
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={selectedTestimonials.length === 0}
          className="mb-4 w-full"
          // className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md font-medium"
        >
          Submit Selected Testimonials
        </Button>
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
export default Page
