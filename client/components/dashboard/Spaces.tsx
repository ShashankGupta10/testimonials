'use client'

import { useGetSpaces } from '@/hooks/useGetSpaces'
import { BiMessage, BiVideo } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import LoadingAndErrorWrapper from '../common/LoadingAndErrorWrapper'
import EmbedModal from '../embedModal'
import EmbedFormModal from '../embedFormModal'
import { useDeleteSpace } from '@/hooks/useDeleteSpace'
import { toast } from 'react-toastify'
import { Delete } from 'lucide-react'
import DeleteSpaceModal from './DeleteSpaceModal'

const Spaces = () => {
  const router = useRouter()
  const { mutate } = useDeleteSpace()
  const { data, error, isLoading } = useGetSpaces()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [embedModalOpen, setEmbedModalOpen] = useState(false)
  const [embedFormModalOpen, setEmbedFormModalOpen] = useState(false)
  const [spaceId, setSpaceId] = useState<string | null>(null)
  const [deletingSpace, setDeletingSpace] = useState<{ id: string, name: string } | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (openDropdown) {
      setOpenDropdown(null)
    }
  }, [embedModalOpen])

  const handleDropdownToggle = (spaceId: string) => {
    setOpenDropdown(openDropdown === spaceId ? null : spaceId)
  }

  const deleteSpaceModalOpen = async (spaceId: string) => {
    // mutate(spaceId)
    console.log(data);
    setDeletingSpace({ id: spaceId, name: data?.find((space) => space.id === spaceId)?.spaceName || '' })
    setDeleteModalOpen(true)
  }

  const deleteSpace = async () => {
    if (!deletingSpace || !deletingSpace.id) {
      toast.error('Space ID not found')
      return
    }
    mutate(deletingSpace.id, {
      onSuccess: () => {
        router.refresh()
        toast.success('Space deleted successfully')
      },
      onError: () => {
        toast.error('Failed to delete space')
      }
    })
    setDeleteModalOpen(false)
  }

  return (
    <LoadingAndErrorWrapper isLoading={isLoading} error={error}>
      {deleteModalOpen && (<DeleteSpaceModal deleteSpace={deleteSpace} setDeleteModalOpen={setDeleteModalOpen} spaceId={deletingSpace?.name || ''} />)}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full justify-center items-center">
        {Array.isArray(data) &&
          data.length > 0 &&
          data?.map((space) => (
            <div
              className="relative bg-white rounded-2xl shadow-lg"
              key={space.spaceName}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                {/* Image Section */}
                <div className="flex justify-center items-center lg:col-span-3 col-span-12">
                  <img
                    src="https://picsum.photos/300/150"
                    alt="Space"
                    className="rounded-xl h-full w-full object-cover"
                  />
                </div>

                <div className="col-span-12 lg:col-span-9 space-y-4 relative">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {space.spaceName}
                    </h2>

                    {/* Dropdown Button - Moved beside the name */}
                    <div className="md:absolute md:top-4 md:right-4">
                      <button
                        onClick={() => {
                          handleDropdownToggle(space.id)
                          setSpaceId(space.id)
                        }}
                        className="focus:outline-none"
                      >
                        <HiDotsVertical className="text-gray-500 w-6 h-6" />
                      </button>
                      {openDropdown === space.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <ul>
                            <li
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                router.push(
                                  `/app/dashboard/testimonials/${space.id}`,
                                )
                              }
                            >
                              Testimonials
                            </li>
                            <li
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => router.push(`/${space.id}`)}
                            >
                              Form
                            </li>
                            <li
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                router.push(
                                  `/app/dashboard/preview/${space.id}`,
                                )
                              }
                            >
                              Preview
                            </li>
                            <li
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => setEmbedModalOpen(true)}
                            >
                              Embed Testimonials
                            </li>
                            <li
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => setEmbedFormModalOpen(true)}
                            >
                              Embed Form
                            </li>
                            <li
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => deleteSpaceModalOpen(space.id)}
                            >
                              Delete Space
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

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
      <EmbedModal
        open={embedModalOpen}
        setOpen={setEmbedModalOpen}
        spaceId={spaceId as string}
      />
      <EmbedFormModal
        embedFormModalOpen={embedFormModalOpen}
        setEmbedFormModalOpen={setEmbedFormModalOpen}
        spaceId={spaceId as string}
      />
    </LoadingAndErrorWrapper>
  )
}

export default Spaces
