'use client'
import React from 'react';
import Link from 'next/link';

const BackToHomeLink = () => {
  return (
    <>
      <Link 
        href="/"
        className="inline-flex justify-center items-center px-3 py-1.5 text-sm/6 text-black font-semibold border border-gray-500 rounded-md bg-white hover:brightness-90"
      >
        ホームへ戻る
      </Link>
    </>
  )
}

export default BackToHomeLink