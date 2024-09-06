import React from 'react'
import Header from '../../components/layouts/Header';

type Props = {
  isAdmin: boolean;
  id: string;
  children: Readonly<React.ReactNode>;
}

const Main = ({ children, isAdmin, id }: Props) => {
  return (
    <div className="flex min-h-screen">
      <Header isAdmin={isAdmin} id={id}/>
      <div className="flex flex-col w-full p-6 bg-blue-100 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}

export default Main