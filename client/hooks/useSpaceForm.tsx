import { SpaceType } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useSpace = (slug: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['space', slug],
    queryFn: () => fetchSpace(slug),
  })
  return { data, isLoading, error }
}

const fetchSpace = async (slug: string) => {
  const res = await fetch(
    `https://testimonials-s796.onrender.com/api/v1/spaces/getSpace/${slug}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  )

  if (!res.ok) throw new Error((await res.json()).message)
  const data: SpaceType = await res.json()
  return data
}
