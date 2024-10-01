import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export const useDeleteSpace = () => {
  const router = useRouter()
  return useMutation({
    mutationKey: ['deleteSpace'],
    mutationFn: deleteSpace,
    onSuccess: () => {
      toast.success('Space deleted successfully')
      router.refresh()
    }
  })
}

const deleteSpace = async (slug: string) => {
  const response = await fetch(
    'https://testimonials-s796.onrender.com/api/v1/spaces/delete',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ spaceId: slug }),
      credentials: 'include',
    },
  )
  const data = await response.json()
  return data
}