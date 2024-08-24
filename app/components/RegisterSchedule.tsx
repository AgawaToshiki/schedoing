'use client'
import React, { useState } from 'react'
import TimePicker from '../components/TimePicker';

const RegisterSchedule = () => {
  //初期時刻を直近の15分刻みの時刻に設定
  const defaultStartDate = new Date();
  const minutes = defaultStartDate.getMinutes();
  const remainder = minutes % 15;
  defaultStartDate.setMinutes(minutes + (15 - remainder));
  defaultStartDate.setSeconds(0);
  defaultStartDate.setMilliseconds(0);
  //デフォルト終了時刻は開始時刻+15分
  const defaultEndDate = new Date(defaultStartDate.getTime());
  defaultEndDate.setMinutes(defaultStartDate.getMinutes() + 15);

  const [startTime, setStartTime] = useState<Date>(defaultStartDate);
  const [endTime, setEndTime] = useState<Date>(defaultEndDate);
  const [title, setTitle] = useState<string>("");


  const handleChangeStartTime = (newStartTime: Date) => {
    //設定した開始時刻が終了時刻より後の場合は終了時刻を開始時刻+15分に設定
    if(newStartTime.getTime() >= endTime.getTime()){
      const newEndTime = new Date(newStartTime.getTime());
      newEndTime.setMinutes(newEndTime.getMinutes() + 15);
      setEndTime(newEndTime);
    }
  }

  const handleChangeEndTime = (newEndTime: Date) => {
    //設定した終了時刻が開始時刻より前の場合は開始時刻を終了時刻-15分に設定
    if(newEndTime.getTime() <= startTime.getTime()){
      const newStartTime = new Date(newEndTime.getTime());
      newStartTime.setMinutes(newStartTime.getMinutes() - 15);
      setStartTime(newStartTime);
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await fetch('../api/schedule/register', {
        cache: "no-store",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startTime, endTime, title }),
      })

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error, data.status);
      }
      setStartTime(defaultStartDate);
      setEndTime(defaultEndDate);
      setTitle("");

    }catch(err){
      console.error(err);
    }
  }

  return (
    <>
      <div className="w-[300px]">
        <form action="" onSubmit={handleSubmit}>
          <input 
            type="text"
            name="title"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-200 shadow-md text-base block p-1 h-12"
          />
          <div className="flex">
            <TimePicker
              id='startTime'
              name='startTime'
              title='開始'
              value={startTime}
              setter={setStartTime}
              onChange={handleChangeStartTime}
            />
            <TimePicker
              id='endTime'
              name='endTime'
              title='終了'
              value={endTime}
              setter={setEndTime}
              onChange={handleChangeEndTime}
            />
          </div>
          <button 
            type="submit"
            className="flex items-center justify-center w-[50px] h-[50px] border rounded-full text-2xl bg-blue-500">
              +
          </button>
        </form>
      </div>
    </>
  )
}

export default RegisterSchedule