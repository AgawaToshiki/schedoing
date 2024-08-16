import React from 'react';
import Link from 'next/link';
import SignOutButton from './SignOutButton';

type Props = {
  isAdmin: boolean;
}

const Header = async({ isAdmin }: Props) => {

  return (
    <header className="bg-blue-400">
      <div className="flex flex-col justify-between w-[275px] h-full p-6">
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
        <div>
          <SignOutButton />
        </div>
      </div>
    </header>
  )
}

export default Header