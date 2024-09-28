import { useMutation } from '@tanstack/react-query'
import { spaceSchema, SpaceType } from "@appTypes"
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export const useCreateSpace = () => {
  const router = useRouter()
  return useMutation({
    mutationKey: ['createSpace'],
    mutationFn: fetchData,
    onSuccess: () => {
      router.refresh()
    }
  })
}

const fetchData = async (formData: SpaceType) => {
  const { data, success, error } = spaceSchema.safeParse(formData)
  if (!success) return toast.error(error.issues[0].message)
  const response = await fetch('http://localhost:5000/api/v1/spaces/createSpace', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!response.ok) throw new Error('Network response was not ok')
  const json_data = await response.json()
  console.log(json_data)
  return json_data
}
