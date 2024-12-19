import React from 'react';
import Modal from '../layouts/Modal';
import ScheduleForm from '../../components/schedule/ScheduleForm';
import ScheduleDetail from '../../components/schedule/ScheduleDetail';
import { Schedule } from '../../types';


type Props = {
  isOpen: boolean;
  userId: string;
  isOwn: boolean;
  schedule: Schedule;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleModal = ({ isOpen, userId, isOwn, schedule, setter }: Props) => {
  const scheduleStartTime = new Date(schedule.start_time);
  const scheduleEndTime = new Date(schedule.end_time);


  return (
    <>
      <Modal isOpen={isOpen} setter={setter} title="スケジュール詳細">
        {isOwn ? (
          <ScheduleForm
            scheduleId={schedule.id}
            userId={userId}
            title={schedule.title} 
            description={schedule.description}
            startTime={scheduleStartTime} 
            endTime={scheduleEndTime}
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