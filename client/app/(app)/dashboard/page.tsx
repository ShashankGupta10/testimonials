import Products from '@/components/dashboard/Products'
import Stats from '@/components/dashboard/Stats'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-8'>
      <Stats />
      <Products />
    </div>
  )
}

export default page
