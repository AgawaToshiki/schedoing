import React from 'react'

type variant = "primary" | "secondary" | "danger";

type size = "small" | "medium" | "large";

type form = "square" | "circle";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant: variant;
  size: size;
  form: form;
  className?: string;
  attrs: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: Readonly<React.ReactNode>;
}

const Button = ({ onClick, variant, size, form, className, attrs, children }: Props) => {

  const baseStyle = `flex justify-center items-center font-semibold border transition duration-200 ease-in-out hover:brightness-90 select-none`;

  const variantStyle: Record<variant, string> = {
    primary: "bg-blue-500 border-blue-500 text-white",
    secondary: "bg-white border-gray-500 text-black",
    danger: "bg-red-500 border-red-500 text-white"
  }

  const sizeStyle: Record<size, string> = {
    small: "",
    medium: "px-3 py-1.5 text-sm/6",
    large: "",
  }

  const formStyle: Record<form, string> = {
    square: "rounded-md",
    circle: "rounded-full",
  }

  const disabledStyle = "disabled:bg-gray-500 disabled:border-gray-500 disabled:brightness-100 disabled:cursor-default disabled:opacity-50";

  const optionStyle = className ? className : "";

  const buttonStyle = [
    baseStyle,
    variantStyle[variant],
    sizeStyle[size],
    formStyle[form],
    attrs.disabled ? disabledStyle : '',
    optionStyle
  ].filter(Boolean).join(' ');
  
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