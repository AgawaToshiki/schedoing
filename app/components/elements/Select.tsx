import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Select = ({ errorMessage, options, ...props }: SelectProps) => {

  const baseStyle = "w-full border rounded-sm shadow-md block px-2 h-12 bg-white max-md:h-10 max-md:shadow-sm"
  const errorStyle = `${errorMessage ? "border-red-400" : "border-gray-200"}`
  const propsStyle = `${props.className ? props.className : ""}`

  const selectStyle = [
    baseStyle,
    errorStyle,
    propsStyle
  ].filter(Boolean).join(' ');
  
  return (
    <>
      <select
        {...props}
        className={selectStyle}
      >
        {props.value === "" && (
          <option
            value=""
            selected
            disabled
            hidden
          >
            選択してください
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}

export default Select