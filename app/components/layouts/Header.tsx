import React from 'react';
import SignOutButton from '../../components/SignOutButton';
import Navigation from '../../components/layouts/Navigation';

type Props = {
  isAdmin: boolean;
  id: string;
}

const Header = ({ isAdmin, id }: Props) => {

  return (
    <header className="sticky top-0 h-screen bg-blue-400">
      <div className="flex flex-col w-[275px] h-full overflow-y-auto">
        <div className="sticky top-0 p-6 bg-blue-400">
          <h1 className="text-2xl">Share-do</h1>
        </div>
        <div className="px-6">
          <Navigation isAdmin={isAdmin} id={id} />
        </div>
        <div className="sticky bottom-0 p-6 mt-auto bg-blue-400">
          <SignOutButton />
        </div>
      </div>
    </header>
  )
}

export default Header