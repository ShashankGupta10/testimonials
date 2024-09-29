import { useQuery } from '@tanstack/react-query'

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ['checkAuth'],
    queryFn: checkAuth,
  })
}

const checkAuth = async () => {
  const response = await fetch('http://localhost:5000/api/v1/auth/checkAuth', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  const data: {
    success: boolean
    message: string
  } = await response.json()
  console.log('IN API', data)
  return data.success
}
