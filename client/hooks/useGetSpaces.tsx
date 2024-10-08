import { useQuery } from '@tanstack/react-query'
import { Spaces } from '@/types/createSpace'
import { BACKEND_URL } from '@/constants/hero'

export const useGetSpaces = () => {
  return useQuery({
    queryKey: ['spaces'],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_URL}/api/v1/spaces/getSpaces`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })

      if (!res.ok) throw new Error((await res.json()).message)
      const data: Spaces[] = await res.json()
      return data
    },
  })
}
