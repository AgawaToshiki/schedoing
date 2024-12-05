'use client'
import React from 'react';
import { Switch } from '@headlessui/react';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SwitchElement = ({ checked, onChange }: Props) => {
  return (
    <>
      <Switch
        checked={checked}
        onChange={onChange}
        name="toggle"
        className="group inline-flex items-center h-6 w-12 cursor-pointer rounded-full bg-gray-300 data-[checked]:bg-green-500 p-1 transition-colors duration-200 ease-in-out"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
    </>
  )
}

export default SwitchElement