'use client'

import { useGetSpaces } from '@/hooks/useGetSpaces'
import LoadingAndErrorWrapper from '../common/LoadingAndErrorWrapper'
import { BiMessage, BiVideo } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'

const Spaces = () => {
  const { data, error, isLoading } = useGetSpaces()
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleDropdownToggle = (spaceId: string) => {
    setOpenDropdown(openDropdown === spaceId ? null : spaceId)
  }

  return (
    <LoadingAndErrorWrapper isLoading={isLoading} error={error}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full justify-center items-center">
        {data?.map((space) => (
          <div
            className="relative bg-white rounded-2xl shadow-lg"
            key={space.spaceName}
          >
            {/* Dropdown Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => handleDropdownToggle(space.id)}
                className="focus:outline-none"
              >
                <HiDotsVertical className="text-gray-500 w-6 h-6" />
              </button>

              {/* Dropdown Menu */}
              {openDropdown === space.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <ul>
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/testimonials/${space.id}`)
                      }
                    >
                      Testimonials
                    </li>
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => router.push(`/dashboard/${space.id}`)}
                    >
                      Form
                    </li>
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => router.push(`/dashboard/preview/${space.id}`)}
                    >
                      Preview
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
              <div className="flex justify-center items-center lg:col-span-3 md:col-span-12">
                <img
                  src="https://picsum.photos/300/150"
                  alt="Space"
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>
              <div className="md:col-span-9 space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {space.spaceName}
                </h2>
                <p className="text-gray-600 text-base">
                  {space.customMessage}
                </p>
                <div className="flex items-center space-x-4 text-gray-700">
                  <span className="flex items-center gap-1">
                    <BiMessage className="text-indigo-600 w-6 h-6" />
                    {
                      space.testimonials.filter(
                        (testimonial) => testimonial.testimonialMessage,
                      ).length
                    }{' '}
                    Messages
                  </span>

                  <span className="flex items-center gap-1">
                    <BiVideo className="text-indigo-600 w-6 h-6" />
                    {
                      space.testimonials.filter(
                        (testimonial) => testimonial.testimonialVideo,
                      ).length
                    }{' '}
                    Videos
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </LoadingAndErrorWrapper>
  )
}

export default Spaces
