import React from 'react'

type Props = {
  onClick?: () => void;
  attrs: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: Readonly<React.ReactNode>;
}

const Button = ({ onClick, attrs, children }: Props) => {

  return (
    <>
      <button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-600 disabled:cursor-default disabled:opacity-50" {...attrs} onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default Button