'use client'
import React from 'react'

type Props = {
  title: string;
  startTime: Date;
  endTime: Date;
}

const RegisterScheduleButton = (props: Props) => {
  const handleRegisterSchedule = async() => {
    try{
      const response = await fetch('../api/registerSchedule', {
        cache: "no-store",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ props }),
      })
      if (!response.ok) {
        throw new Error("response Error");
      }
    }catch(err){
      console.error(err);
    }



  }
  return (
    <>
      <button onClick={handleRegisterSchedule} className="flex items-center justify-center w-[50px] h-[50px] border rounded-full text-2xl bg-blue-500">
        +
      </button>
    </>
  )
}

export default RegisterScheduleButton