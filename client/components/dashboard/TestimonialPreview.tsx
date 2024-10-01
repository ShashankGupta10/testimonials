'use client'
import { SpaceType } from '@/types'
import { useState } from 'react'
import RecordVideoModal from '../getTestimonial/RecordVideoModal'
import SendTextModal from '@/components/getTestimonial/SendTextModal'

const TestimonialPreview = ({
  formData,
  isForm,
}: {
  formData: SpaceType
  isForm: boolean
}) => {
  const [isRecordVideoModalOpen, setIsRecordVideoModalOpen] = useState(false)
  const [isSendTextModalOpen, setIsSendTextModalOpen] = useState(false)
  const recordVideo = () => {
    if (isForm) {
      setIsRecordVideoModalOpen(true)
    }
  }

  const sendText = () => {
    if (isForm) {
      setIsSendTextModalOpen(true)
    }
  }

  return (
    <div
      className={`bg-white text-black p-6 rounded-lg shadow-lg mx-auto ${isForm ? 'max-w-3xl' : 'w-full'} my-auto`}
    >
      <div className="flex justify-center mb-4">
        <div className="bg-black p-4 rounded-full">
          <span className="text-white text-3xl">👍</span>
        </div>
      </div>

      <p className="text-center text-2xl font-semibold mb-2 break-words">
        {formData.headerTitle}
      </p>
      <p className="text-center text-gray-dark mb-6 break-words">
        {formData.customMessage}
      </p>

      <div className="mb-4">
        <h3 className="text-gray-dark font-semibold">QUESTIONS</h3>
        <ul className="list-disc list-inside text-black">
          {formData.questions.map((question, index) => (
            <div key={index}>
              <li>{question}</li>
            </div>
          ))}
        </ul>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          className="bg-black text-white py-2 rounded"
          onClick={recordVideo}
        >
          🎥 Record a video
        </button>
        <button
          className="bg-gray-100 py-2 rounded text-black"
          onClick={sendText}
        >
          📝 Send in text
        </button>
      </div>
      <RecordVideoModal
        isOpen={isRecordVideoModalOpen}
        onClose={() => setIsRecordVideoModalOpen(false)}
      />
      <SendTextModal
        isOpen={isSendTextModalOpen}
        onClose={() => setIsSendTextModalOpen(false)} 
        spaceData={formData}
      />
    </div>
  )
}

export default TestimonialPreview
