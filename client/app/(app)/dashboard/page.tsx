import CreateNewSpace from '@/components/dashboard/CreateSpace'
import Spaces from '@/components/dashboard/Spaces'
import Stats from '@/components/dashboard/Stats'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-8'>
      <Stats />
      <CreateNewSpace />
      <Spaces />
    </div>
  )
}

export default page
