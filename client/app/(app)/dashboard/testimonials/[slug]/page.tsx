'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useGetTestimonials } from '@/hooks/useGetTestimonials'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useSelectTestimonials } from '@/hooks/useSelectTestimonials'

const Page = () => {
  const { slug } = useParams()
  const { mutate } = useSelectTestimonials()
  const { data: testimonials } = useGetTestimonials(slug as string)

  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([])

  useEffect(() => {
    if (testimonials) {
      setSelectedTestimonials(
        testimonials
          .filter((t) => t.selected)
          .map((t) => t.id)
          .filter((id): id is string => id !== undefined)
      )
    }
  }, [testimonials])

  const handleSelectTestimonial = (id: string) => {
    if (selectedTestimonials.includes(id)) {
      setSelectedTestimonials(selectedTestimonials.filter((t) => t !== id))
    } else if (selectedTestimonials.length < 3) {
      setSelectedTestimonials([...selectedTestimonials, id])
    }
  }

  const handleSubmit = () => {
    console.log('Selected Testimonials:', selectedTestimonials)
    mutate({ spaceId: slug as string, selectedTestimonials })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Testimonials for {slug}</h1>

      {/* Grid layout for testimonials: 2 columns on larger screens, 1 column on small screens */}
      <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials?.map((testimonial, idx) => (
          <Card key={idx} className="p-4 border border-gray-300 rounded-lg">
            <CardHeader className="flex items-center space-x-4">
              <RadioGroupItem
                value={testimonial.id!}
                checked={selectedTestimonials.includes(testimonial.id!)}
                onClick={() => handleSelectTestimonial(testimonial.id!)}
                disabled={
                  !selectedTestimonials.includes(testimonial.id!) &&
                  selectedTestimonials.length >= 3
                }
              />
              <div>
                <CardTitle className="font-semibold text-lg">
                  {testimonial.name} ({testimonial.companyName})
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {testimonial.testimonialMessage
                    ? 'Text Testimonial'
                    : 'Video Testimonial'}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="mt-4 space-y-2">
              {testimonial.testimonialMessage ? (
                <p className="text-gray-700">
                  {testimonial.testimonialMessage}
                </p>
              ) : (
                testimonial.testimonialVideo && (
                  <video
                    controls
                    src={testimonial.testimonialVideo}
                    className="w-full"
                  />
                )
              )}
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      <div className="mt-8">
        <Button
          onClick={handleSubmit}
          disabled={selectedTestimonials.length === 0}
          className="w-full"
        >
          Submit Selected Testimonials
        </Button>
      </div>
    </div>
  )
}

export default Page
