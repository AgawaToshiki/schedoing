import React from 'react';

const Loading = () => {
  return(
    <div className="flex justify-center items-center gap-6 w-full min-h-screen p-6 bg-blue-100">
      <div className="w-6 h-6 border-t-2 border-l-2 rounded-full border-blue-400 animate-rotate-center"></div>
      <p className="text-xl">Loading</p>
    </div>
  )
}

export default Loading