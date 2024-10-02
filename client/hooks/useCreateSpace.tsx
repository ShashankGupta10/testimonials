import { useMutation } from '@tanstack/react-query'
import { spaceSchema, SpaceType } from "@/types"
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { BACKEND_URL } from '@/constants/hero'

export const useCreateSpace = () => {
  const router = useRouter()
  return useMutation({
    mutationKey: ['createSpace'],
    mutationFn: fetchData,
    onSuccess: () => {
      router.refresh()
      toast.success('Space created successfully')
    }
  })
}

const fetchData = async (formData: SpaceType) => {
  const { data, success, error } = spaceSchema.safeParse(formData)
  if (!success) return toast.error(error.issues[0].message)
  const response = await fetch(`${BACKEND_URL}/api/v1/spaces/createSpace`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!response.ok) throw new Error('Network response was not ok')
  const json_data = await response.json()
  return json_data
}
