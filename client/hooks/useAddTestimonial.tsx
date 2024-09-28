import { Testimonial } from '@/types/testimonial'
import { useMutation } from '@tanstack/react-query'

export const useAddTestimonial = () => {
  return useMutation({
    mutationKey: ['addTestimonial'],
    mutationFn: addTestimonial,
  })
}

const addTestimonial = async (testimonial: Testimonial) => {
  const response = await fetch(
    'http://localhost:5000/api/v1/testimonials/add',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial),
    },
  )
  const data = await response.json()
  return data
}
