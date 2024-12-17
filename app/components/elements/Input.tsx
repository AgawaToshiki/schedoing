import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function InputComponent({ errorMessage, ...props }, ref) {

  const baseStyle = "w-full border rounded-sm border-gray-200 shadow-md block px-2 h-12 max-md:h-10 max-md:shadow-sm"
  const errorStyle = `${errorMessage ? "border-red-400" : "border-gray-200"}`
  const propsStyle = `${props.className ? props.className : ""}`

  const inputStyle = [
    baseStyle,
    errorStyle,
    propsStyle
  ].filter(Boolean).join(' ');
  
  return (
    <>
      <input
        {...props}
        ref={ref}
        className={inputStyle}
      />
    </>
  )
})

export default Input