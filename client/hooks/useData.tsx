import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useData = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.github.com/users/ShashankGupta10',
      )
      if (!response.ok) throw new Error('Network response was not ok')
      const json_data: Promise<{ name: string; bio: string }> =
        await response.json()
      return json_data
    },
  })
}
