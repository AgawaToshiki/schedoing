import React from 'react'

type variant = "primary" | "secondary" | "danger" | "icon";

type size = "small" | "medium" | "large";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant: variant;
  size: size;
  className?: string;
  attrs: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: Readonly<React.ReactNode>;
}

const Button = ({ onClick, variant, size, className, attrs, children }: Props) => {

  const disabledStyle = "disabled:bg-gray-500 disabled:border-gray-500 disabled:brightness-100 disabled:cursor-default disabled:opacity-50"

  const baseStyle = `flex justify-center items-center border rounded-md font-semibold transition duration-200 ease-in-out hover:brightness-90 ${disabledStyle}`;

  const variantStyle: Record<variant, string> = {
    primary: "bg-blue-500 border-blue-500 text-white",
    secondary: "bg-white border-gray-500 text-black",
    danger: "bg-red-500 border-red-500 text-white",
    icon: ""
  }

  const sizeStyle: Record<size, string> = {
    small: "",
    medium: "px-3 py-1.5 text-sm/6",
    large: "",
  }

  const buttonStyle = `${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`;

  return (
    <>
      <button 
        className={`${buttonStyle}`}
        {...attrs} 
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button