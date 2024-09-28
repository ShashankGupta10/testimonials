import { useQuery } from '@tanstack/react-query'
import { SpaceType } from '@appTypes'
import { Spaces } from '@/types/createSpace'

export const useGetSpaces = () => {
  return useQuery({
    queryKey: ['spaces'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/v1/spaces/getSpaces', {
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
