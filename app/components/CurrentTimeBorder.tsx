import React from 'react'

type Props = {
  currentTimeHeight: number;
}

const CurrentTimeBorder = ({ currentTimeHeight }: Props) => {
  return (
    <>
      <div className="absolute z-10 w-full" style={{top:`${currentTimeHeight}px`}}>
        <div className='h-0 w-full'>
          <div className='w-full border-t-4 border-red-400 rounded-sm'></div>
        </div>
      </div>
    </>
  )
}

export default CurrentTimeBorder