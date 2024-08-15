import React from 'react'
import SignOutButton from './SignOutButton'

const Header = () => {
  return (
    <header className="bg-green-200">
      <div>
        <nav>
          <ul>
            <li>ダッシュボード</li>
            <li>ユーザー管理</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </div>
      <div>
        <SignOutButton />
      </div>
    </header>
  )
}

export default Header