'use client'
import React, { useEffect, useState } from 'react';

type Props = {
  children: Readonly<React.ReactNode>;
}

const Ellipses = ({ children }: Props) => {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 500)
    return () => {
      clearInterval(intervalId);
    }
  }, [])

  return (
    <>
      <div className="flex items-center">
        <div>{children}</div>
        <div>{dots}</div>
      </div>
    </>
  )
}

export default Ellipses