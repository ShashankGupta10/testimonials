import { sidebarItems } from '@/constants/sidebar'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className="fixed top-28 rounded-3xl ml-8 w-80 h-[85%] backdrop-blur-sm bg-white flex flex-col gap-8 shadow-xl">
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item, idx) => (
          <div className='p-4' key={idx}>
            <p className='font-semibold'>{item.name}</p>
            <div className='p-2 flex flex-col gap-3'>
              {item.items.map((subItem, idx) => (
                <Link
                  className="text-gray-500 hover:text-indigo-600"
                  key={idx}
                  href={subItem.link}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
