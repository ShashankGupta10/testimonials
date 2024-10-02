import { BACKEND_URL } from '@/constants/hero'
import { Testimonial } from '@/types/testimonial'
import { useMutation } from '@tanstack/react-query'

export const useAddTestimonial = () => {
  return useMutation({
    mutationKey: ['addTestimonial'],
    mutationFn: addTestimonial,
  })
}

const addTestimonial = async (testimonial: Testimonial) => {
  const response = await fetch(`${BACKEND_URL}/api/v1/testimonials/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testimonial),
  })
  const data = await response.json()
  return data
}
