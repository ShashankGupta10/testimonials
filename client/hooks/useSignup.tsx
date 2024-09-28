import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useSignup = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: fetchData,
  })
}

const fetchData = async (formData: {
  username: string
  password: string
  name: string
}) => {
  const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) throw new Error('Network response was not ok')
  toast.success('Signup successful')
  const json_data = await response.json()
  return json_data
}
