import { BACKEND_URL } from "@/constants/hero"
import { useMutation } from "@tanstack/react-query"

export const useDeleteSpace = () => {
  return useMutation({
    mutationKey: ['deleteSpace'],
    mutationFn: deleteSpace,
  })
}

const deleteSpace = async (slug: string) => {
  const response = await fetch(
    `${BACKEND_URL}/api/v1/spaces/delete`,
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