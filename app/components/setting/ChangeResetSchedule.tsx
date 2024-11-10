'use client'
import React, { useState } from 'react'
import { Field, Label, Switch } from '@headlessui/react'


type Props = {
  id: string;
  resetFlag: boolean;
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const ChangeResetSchedule = ({ id, resetFlag }: Props) => {
  const [enabled, setEnabled] = useState<boolean>(resetFlag);

  const handleChangeToggle = async() => {
    try {
      const response = fetch(`${base_url}/api/user/update/${id}`);
    } catch {

    }
    setEnabled(!enabled);
  }

  return (
    <>
      <form action="">
        <Field>
          <Label>
            日付変更時にスケジュールをリセット
          </Label>
          <Switch
            checked={enabled}
            onChange={handleChangeToggle}
            name="toggle"
            className="group inline-flex items-center h-6 w-12 cursor-pointer rounded-full bg-gray-200 data-[checked]:bg-green-500 p-1 transition-colors duration-200 ease-in-out"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
            />
          </Switch>
        </Field>
      </form>
    </>
  )
}

export default ChangeResetSchedule