import React from 'react';

type Props = {
  sectionTitle: string;
  children: Readonly<React.ReactNode>;
}

const SectionField = ({ sectionTitle, children }: Props) => {
  return (
    <div className="flex flex-col w-full h-full p-6 border border-gray-200 rounded-md shadow-md bg-white max-md:p-4">
      <div className="mb-6 max-md:mb-4">
        <h2>{sectionTitle}</h2>
      </div>
      {children}
    </div>
  )
}

export default SectionField 