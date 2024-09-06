import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center gap-1">
      <div
        className="w-3 h-3 rounded-full bg-indigo-600 animate-bounce"
        style={{ animationDelay: '0s' }}
      ></div>
      <div
        className="w-3 h-3 rounded-full bg-indigo-600 animate-bounce"
        style={{ animationDelay: '0.2s' }}
      ></div>
      <div
        className="w-3 h-3 rounded-full bg-indigo-600 animate-bounce"
        style={{ animationDelay: '0.4s' }}
      ></div>
    </div>
  )
}

export default Loading
