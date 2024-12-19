import React from 'react';

type variant = "primary" | "secondary" | "danger" | "transparent";
type size = "small" | "medium" | "large";
type form = "square" | "circle";
type position = "start" | "center" | "end";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant: variant;
  size: size;
  form: form;
  position: position;
  children: Readonly<React.ReactNode>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function ButtonComponent({ onClick, variant, size, form, position, children, ...props }, ref) {

  const baseStyle = "flex items-center font-semibold border transition duration-200 ease-in-out select-none";

  const variantStyle: Record<variant, string> = {
    primary: "bg-blue-500 border-blue-500 text-white hover:brightness-90",
    secondary: "bg-white border-gray-500 text-black hover:brightness-90",
    danger: "bg-red-500 border-red-500 text-white hover:brightness-90",
    transparent: "bg-transparent border-transparent text-white hover:bg-white/20"
  }

  const sizeStyle: Record<size, string> = {
    small: "",
    medium: "px-3 py-2 text-sm",
    large: "",
  }

  const formStyle: Record<form, string> = {
    square: "rounded-md",
    circle: "rounded-full",
  }

  const positionStyle : Record<position, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  }

  const disabledStyle = "disabled:bg-gray-500 disabled:border-gray-500 disabled:brightness-100 disabled:cursor-default disabled:opacity-50";

  const optionStyle = props.className ? props.className : "";

  const buttonStyle = [
    baseStyle,
    variantStyle[variant],
    sizeStyle[size],
    formStyle[form],
    position ? positionStyle[position] : '',
    props.disabled ? disabledStyle : '',
    optionStyle
  ].filter(Boolean).join(' ');
  
  return (
    <>
      <button
        onClick={onClick}
        {...props}
        ref={ref}
        className={buttonStyle}
      >
        {children}
      </button>
    </>
  )
})

export default Button