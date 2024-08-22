import React from 'react';
import Link from 'next/link';
import SignOutButton from '../../components/elements/SignOutButton';

type Props = {
  isAdmin: boolean;
}

const Header = async({ isAdmin }: Props) => {

  return (
    <header className="bg-blue-400">
      <div className="flex flex-col gap-12 w-[275px] h-full p-6">
        <div>
          <h1 className="text-2xl">Share-do</h1>
        </div>
        <div>
          <nav>
            <ul className="flex flex-col gap-3">
              <li><Link href="/">ダッシュボード</Link></li>
              <li className={`${isAdmin ? "block" : "hidden"}`}><Link href="/user">ユーザー管理</Link></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </nav>
        </div>
        <div className="mt-auto">
          <SignOutButton />
        </div>
      </div>
    </header>
  )
}

export default Header