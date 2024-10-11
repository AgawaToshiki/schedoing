import React from 'react'
import { Database } from '@/database.types';
import Modal from '../layouts/Modal';
import ScheduleForm from '../../components/schedule/ScheduleForm';
import ScheduleDetail from '../../components/schedule/ScheduleDetail';

type ScheduleByDatabase = Database['public']['Tables']['schedules']['Row'];
type Schedule = Pick<ScheduleByDatabase, 'id' | 'title' | 'description' | 'start_time' | 'end_time'>


type Props = {
  isOpen: boolean;
  isOwn: boolean;
  schedule: Schedule;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleModal = ({ isOpen, isOwn, schedule, setter }: Props) => {

  const scheduleStartTime = new Date(schedule.start_time);
  const scheduleEndTime = new Date(schedule.end_time);


  return (
    <>
      <Modal isOpen={isOpen} setter={setter} title="スケジュール詳細">
        {isOwn ? (
          <ScheduleForm
            id={schedule.id}
            title={schedule.title} 
            description={schedule.description}
            startTime={scheduleStartTime} 
            endTime={scheduleEndTime}
            isOwn={isOwn}
            setter={setter}
            name="update"
          />
        ):(
          <ScheduleDetail
            title={schedule.title}
            description={schedule.description}
            startTime={scheduleStartTime} 
            endTime={scheduleEndTime}
          />
        )}
      </Modal>
    </>

  )
}

export default ScheduleModal