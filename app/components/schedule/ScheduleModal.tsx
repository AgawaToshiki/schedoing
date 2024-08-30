'use client'
import React, { useState } from 'react'
import { Database } from '@/database.types';
import Modal from '../layouts/Modal';
import ScheduleForm from '../../components/schedule/ScheduleForm';
import ScheduleDetail from '../../components/schedule/ScheduleDetail';
import Button from '../../components/elements/button/Button'

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
type Schedule = Pick<ScheduleByDatabase, 'id' | 'title' | 'start_time' | 'end_time'>


type Props = {
  isOpen: boolean;
  isOwn: boolean;
  schedule: Schedule;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleModal = ({ isOpen, isOwn, schedule, setter }: Props) => {

  const [disabled, setDisabled] = useState<boolean>(true);

  const scheduleStartTime = new Date(schedule.start_time);
  const scheduleEndTime = new Date(schedule.end_time);

  const buttonAttrs: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "submit",
    disabled: disabled,
  }


  return (
    <>
      <Modal isOpen={isOpen} setter={setter} title="スケジュール詳細">
        {isOwn ? (
          <ScheduleForm
            id={schedule.id}
            title={schedule.title} 
            startTime={scheduleStartTime} 
            endTime={scheduleEndTime}
            isOwn={isOwn}
            setter={setter}
            setBtnAttr={setDisabled}
            path="update"
          >
            <div className="flex justify-end">
              <button type="submit">更新</button>
              <Button
                attrs={buttonAttrs}
              >
                更新
              </Button>
            </div>
          </ScheduleForm>
        ):(
          <ScheduleDetail
            title={schedule.title} 
            startTime={scheduleStartTime} 
            endTime={scheduleEndTime}
          />
        )}
      </Modal>
    </>

  )
}

export default ScheduleModal