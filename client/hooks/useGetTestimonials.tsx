import { BACKEND_URL } from '@/constants/hero'
import { Testimonial } from '@/types/testimonial'
import { useQuery } from '@tanstack/react-query'

export const useGetTestimonials = (slug: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/testimonials/get?spaceId=${slug}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: { success: boolean, data: Testimonial[] } = await response.json()
      return data["data"]
    },
  })

  return { data, error, isLoading }
}
