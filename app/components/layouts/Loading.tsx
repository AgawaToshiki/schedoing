import React from 'react'

const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center gap-6 max-sm:gap-4">
        <div className="w-6 h-6 border-t-2 border-l-2 rounded-full border-blue-400 animate-rotate-center max-sm:w-4 max-sm:h-4 max-sm:border-t-1 max-sm:border-l-1"></div>
        <p className="text-xl max-sm:text-base">Loading</p>
      </div>
    </>

  )
}

export default Loading