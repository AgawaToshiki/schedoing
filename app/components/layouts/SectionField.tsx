import React from 'react'

type Props = {
  children: Readonly<React.ReactNode>
}

const SectionField = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center mx-4 p-6 border border-gray-200 rounded-md shadow-md bg-white">
      {children}
    </div>
  )
}

export default SectionField 