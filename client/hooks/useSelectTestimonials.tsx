import { BACKEND_URL } from '@/constants/hero'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useSelectTestimonials = () => {
  return useMutation({
    mutationKey: ['selectTestimonials'],
    mutationFn: async (data: {
      spaceId: string
      selectedTestimonials: string[]
    }) => {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/testimonials/select`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
            credentials: 'include',
        },
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const responseData: { success: boolean; message: string } =
        await response.json()
      if (responseData.success) {
        toast.success(responseData.message)
      }
      return responseData
    },
  })
}
