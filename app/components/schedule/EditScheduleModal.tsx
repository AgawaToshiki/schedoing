'use client'
import React from 'react'
import { Database } from '@/database.types';
import Modal from '../../components/layouts/Modal';
import ScheduleForm from '../../components/schedule/ScheduleForm';

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
type Schedule = Pick<ScheduleByDatabase, 'id' | 'title' | 'start_time' | 'end_time'>


type Props = {
  isOpen: boolean;
  schedule: Schedule;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditScheduleModal = ({ isOpen, schedule, setter }: Props) => {

  const scheduleStartTime = new Date(schedule.start_time);
  const scheduleEndTime = new Date(schedule.end_time);

  return (
    <>
      <Modal isOpen={isOpen} setter={setter} title="スケジュール詳細">
        <ScheduleForm
          id={schedule.id}
          title={schedule.title} 
          startTime={scheduleStartTime} 
          endTime={scheduleEndTime}
          setter={setter}
          path="update"
        >
          <div className="flex gap-4 justify-end">
            <button onClick={() => setter(false)}>削除</button>
            <button type="submit">更新</button>
          </div>
        </ScheduleForm>
      </Modal>
    </>

  )
}

export default EditScheduleModal