import { useMutation } from "@tanstack/react-query"

export const useDeleteSpace = () => {
  return useMutation({
    mutationKey: ['deleteSpace'],
    mutationFn: deleteSpace,
  })
}

const deleteSpace = async (slug: string) => {
  const response = await fetch(
    'http://localhost:5000/api/v1/spaces/delete?spaceId=' + slug,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    },
  )
  const data = await response.json()
  return data
}