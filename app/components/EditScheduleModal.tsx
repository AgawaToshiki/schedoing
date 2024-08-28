import React, { useState } from 'react'
import { Database } from '@/database.types';
import Modal from '../components/layouts/Modal';
import TimePicker from '../components/TimePicker';

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
type Schedule = Pick<ScheduleByDatabase, 'id' | 'title' | 'start_time' | 'end_time'>


type Props = {
  isShow: boolean;
  schedule: Schedule;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditScheduleModal = ({ isShow, schedule, setter }: Props) => {
  
  const [startTime, setStartTime] = useState<Date>(new Date(schedule.start_time));
  const [endTime, setEndTime] = useState<Date>(new Date(schedule.end_time));
  const [title, setTitle] = useState<string>(schedule.title);


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

  return (
    <>
      <Modal isShow={isShow} setter={setter} title="スケジュール詳細">
        <form>
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
          <div className="flex gap-4 justify-end">
            <button onClick={() => setter(false)}>削除</button>
            <button onClick={() => setter(false)}>更新</button>
          </div>
        </form>
      </Modal>
    </>

  )
}

export default EditScheduleModal