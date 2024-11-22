'use client'
import LoadingAndErrorWrapper from '@/components/common/LoadingAndErrorWrapper'
import TestimonialPreview from '@/components/dashboard/TestimonialPreview'
import { useSpace } from '@/hooks/useSpaceForm'

const page = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading, error } = useSpace(params.slug)

  return (
    <LoadingAndErrorWrapper isLoading={isLoading} error={error}>
      <div className='h-screen flex justify-center items-center'>{data && <TestimonialPreview formData={data} isForm={true} />}</div>
    </LoadingAndErrorWrapper>
  )
}

export default page
