import CreateNewSpace from '@/components/dashboard/CreateSpace'
import Products from '@/components/dashboard/Products'
import Stats from '@/components/dashboard/Stats'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-8'>
      <Stats />
      <CreateNewSpace />
      <Products />
    </div>
  )
}

export default page
