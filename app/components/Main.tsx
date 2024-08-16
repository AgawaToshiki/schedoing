import React from 'react'
import Header from './Header';

type Props = {
  isAdmin: boolean;
  children: Readonly<React.ReactNode>
}

const Main = ({ children, isAdmin }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Header isAdmin={isAdmin}/>
      <div className="flex flex-col w-full bg-blue-100">
        {children}
      </div>
    </div>
  )
}

export default Main