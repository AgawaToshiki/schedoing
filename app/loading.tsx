import React from 'react';
import Loading from './components/layouts/Loading';

const LoadingPage = () => {
  return(
    <div className="flex justify-center items-center w-full min-h-dvh p-6 bg-blue-100 max-md:p-4">
      <Loading />
    </div>
  )
}

export default LoadingPage