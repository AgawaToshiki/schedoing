'use client'
import React from 'react';
import Input from '../../components/elements/Input';

type Props = {
  title: string;
  name: string;
  selected: string
  valueList: {
    label: string;
    value: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectRadioElement = ({ title, name, selected, valueList, onChange }: Props) => {

  return (
    <>
      <div className="flex flex-col mb-6">
        <p className="mb-2 border-b-2 border-gray-600">{title}</p>
        <div className="flex items-center gap-2">
          {valueList.map((item) => (
            <div key={item.value} className="flex items-center">
              <Input
                type="radio"
                id={item.value}
                name={name}
                value={item.value}
                checked={selected === item.value}
                onChange={onChange}
                className="hidden peer"
              />
              <label
                htmlFor={item.value}
                className="p-1 border-2 rounded-md border-gray-600 peer-checked:bg-green-300 cursor-pointer select-none transition duration-200 ease-in-out hover:bg-white"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SelectRadioElement