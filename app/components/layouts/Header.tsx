'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import SignOutButton from '../../components/SignOutButton';
import Navigation from '../../components/layouts/Navigation';

type Props = {
  isAdmin: boolean;
  id: string;
}

const Header = ({ isAdmin, id }: Props) => {

  return (
    <header className="bg-blue-400">
      <div className="flex flex-col gap-12 w-[275px] h-full p-6">
        <div>
          <h1 className="text-2xl">Share-do</h1>
        </div>
        <div>
          <Navigation isAdmin={isAdmin} id={id} />
        </div>
        <div className="mt-auto">
          <SignOutButton />
        </div>
      </div>
    </header>
  )
}

export default Header