import { BACKEND_URL } from '@/constants/hero'
import { useQuery } from '@tanstack/react-query'

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ['checkAuth'],
    queryFn: checkAuth,
  })
}

const checkAuth = async () => {
  const response = await fetch(`${BACKEND_URL}/api/v1/auth/checkAuth`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  const data: {
    success: boolean
    message: string
  } = await response.json()
  return data.success
}
