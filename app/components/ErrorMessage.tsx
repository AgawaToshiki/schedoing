import React from 'react';

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <>
      {errorMessage && (<p className="pt-2 text-sm text-red-400 max-sm:pt-1">{errorMessage}</p>)}
    </>
  )
}

export default ErrorMessage