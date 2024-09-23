import { SpaceType } from '@appTypes'
import React from 'react'

const TestimonialCard = ({ formData }: { formData: SpaceType }) => (
  <div className="bg-white text-black p-6 rounded-lg shadow-lg mx-auto w-full">
    <div className="flex justify-center mb-4">
      <div className="bg-black p-4 rounded-full">
        <span className="text-white text-3xl">👍</span>
      </div>
    </div>
    <div className="text-center text-2xl font-semibold mb-2 break-words">
      {formData.spaceName}
    </div>

    <p className="text-center text-2xl font-semibold mb-2 break-words">
      {formData.headerTitle}
    </p>
    <span className="text-center text-gray-dark mb-6 break-words">
      {formData.customMessage}
    </span>

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
      <button className="bg-black text-white py-2 rounded">
        🎥 Record a video
      </button>
      <button className="bg-gray-100 py-2 rounded text-black">
        📝 Send in text
      </button>
    </div>
  </div>
)

export default TestimonialCard
