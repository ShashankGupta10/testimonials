import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useLogin = () => {
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success('Logged in successfully')
    },
    onError: (error: any) => {
      toast.error(`Login failed: ${error.message}`)
    },
  })

  // Return the mutation object which includes data, error, isLoading, and mutate
  return {
    ...mutation,
    login: mutation.mutate,  // Alias mutate as login for more readable API
  }
}

const fetchData = async (formData: { username: string; password: string }) => {
  const response = await fetch('http://localhost:5000/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
  })

  if (!response.ok) throw new Error('Network response was not ok')

  const json_data = await response.json()
  return json_data
}
