import { TestimonialProps } from '@/app/(app)/dashboard/preview/[slug]/page'
import { useQuery } from '@tanstack/react-query'

export const useGetSelectedTestimonials = (spaceId: string) => {
  return useQuery({
    queryKey: ['selectedTestimonials'],
    queryFn: () => getSelectedTestimonials(spaceId),
  })
}

const getSelectedTestimonials = async (spaceId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/testimonials/selectedTestimonials?spaceId=${spaceId}`,
  )
  const data = await response.json()
  return data.data as TestimonialProps[]
}