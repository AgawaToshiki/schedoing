'use client'
import React, { useState } from 'react'
import TimePicker from '../../components/TimePicker';


type Props = {
  id?: string;
  title: string;
  startTime: Date;
  endTime: Date;
  setter?: React.Dispatch<React.SetStateAction<boolean>>;
  path: string;
  children: Readonly<React.ReactNode>;
}

const ScheduleForm = (props: Props) => {

  const [title, setTitle] = useState<string>(props.title);
  const [startTime, setStartTime] = useState<Date>(props.startTime);
  const [endTime, setEndTime] = useState<Date>(props.endTime);

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

  const filterStartTime = (time: Date): boolean => {
    const selectedDate = new Date(time);

    // 23:45 を選択不可にする
    const hour = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    return !(hour === 23 && minutes === 45);
  };

  const filterEndTime = (time: Date): boolean => {
    const selectedDate = new Date(time);

    // 00:00 を選択不可にする
    const hour = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    return !(hour === 0 && minutes === 0);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!title) {
      throw new Error("title is null")
    }
    if(startTime.getTime() >= endTime.getTime()) {
      throw new Error("Schedule time Error")
    }
    if(title === props.title && startTime === props.startTime && endTime === props.endTime) {
      if(props.setter){
        props.setter(false);
      }
      return
    }
    try{
      const response = await fetch(`../../api/schedule/${props.path}`, {
        cache: "no-store",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: props.id, title, startTime, endTime }),
      })

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error, data.status);
      }

      if(props.setter){
        props.setter(false);
      }
      setStartTime(props.startTime);
      setEndTime(props.endTime);
      setTitle("");

    }catch(err){
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-6">
          <input 
            type="text"
            name="title"
            placeholder="タイトル"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="w-full border border-gray-200 shadow-md text-base block p-1 h-12"
            required
          />
          <div className="flex">
            <TimePicker
              id='startTime'
              name='startTime'
              title='開始'
              value={startTime}
              filterTime={filterStartTime}
              setter={setStartTime}
              onChange={handleChangeStartTime}
            />
            <TimePicker
              id='endTime'
              name='endTime'
              title='終了'
              value={endTime}
              filterTime={filterEndTime}
              setter={setEndTime}
              onChange={handleChangeEndTime}
            />
          </div>
        </div>
        {props.children}
      </form>
    </>
  )
}

export default ScheduleForm