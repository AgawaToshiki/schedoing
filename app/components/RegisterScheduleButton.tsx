import React from 'react'
import { registerSchedule } from '../actions/registerSchedule';

type Props = {
  title: string;
  startTime: Date;
  endTime: Date;
}

const RegisterScheduleButton = (props: Props) => {
  return (
    <>
      <form action={registerSchedule}>
        <button className="flex items-center justify-center w-[50px] h-[50px] border rounded-full text-2xl bg-blue-500">
          +
        </button>
      </form>
    </>
  )
}

export default RegisterScheduleButton