import Loading from '@/app/loading'
import React from 'react'
import { toast } from 'react-toastify'

const LoadingAndErrorWrapper = ({
  isLoading,
  error,
  children,
}: {
  isLoading: boolean
  error: Error | null
  children: React.ReactNode
}) => {
  if (isLoading) return <Loading />
  if (error) return toast.error(error.message)
  return children
}

export default LoadingAndErrorWrapper
