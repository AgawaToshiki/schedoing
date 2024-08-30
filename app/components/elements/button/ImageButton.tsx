import React from 'react'

type Props = {
  onClick?: () => void;
  attrs: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: Readonly<React.ReactNode>;
}

const Button = ({ onClick, attrs, children }: Props) => {

  return (
    <>
      <button className="p-1 border bg-red-400" {...attrs} onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default Button