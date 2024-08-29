import React from 'react';
import Link from 'next/link';
import SignOutButton from '../../components/elements/SignOutButton';

type Props = {
  isAdmin: boolean;
  id: string;
}

const Header = async({ isAdmin, id }: Props) => {
  const lists = [
    {
      href: "/",
      title: "ダッシュボード",
      showFlag: true
    },
    {
      href: `${id}/schedule#currentTimeBorder`,
      title: "スケジュール管理",
      showFlag: true
    },
    {
      href: "/user",
      title: "ユーザー管理",
      showFlag: isAdmin
    },
  ]

  return (
    <header className="bg-blue-400">
      <div className="flex flex-col gap-12 w-[275px] h-full p-6">
        <div>
          <h1 className="text-2xl">Share-do</h1>
        </div>
        <div>
          <nav>
            <ul className="flex flex-col gap-3">
              {lists.map((list) => (
                list.showFlag && (
                  <li key={list.href}>
                    <Link href={list.href}>{list.title}</Link>
                  </li>
                )
              ))}
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