import React from 'react'
import { redirect } from 'next/navigation';
import { getUserWithSchedules } from '../../../utils/supabase/supabaseFunctions';
import { getCurrentUser } from '../../../utils/supabase/auth';
import SchedulePanel from '../../../components/schedule/SchedulePanel';
import SectionField from '../../../components/layouts/SectionField';
import RegisterSchedule from '../../../components/schedule/RegisterSchedule';



const Schedule = async({ params }: { params: { id: string } }) => {
  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}

  const data = await getUserWithSchedules(params.id);
  if(!data){
    throw new Error("User does not exist");
  }

  const paramId: string = params.id;
  const isOwn: boolean = authUser.id === paramId;

  return (
    <>
      {!isOwn && (
        <div className="mb-6">
          {data.displayName}
        </div>
      )}
      {isOwn && (
        <div className="mb-6">
          <SectionField sectionTitle="新規スケジュール">
            <RegisterSchedule userId={paramId}/>
          </SectionField>
        </div>
      )}
      <SchedulePanel
        schedulesData={data.schedules}
        userId={paramId}
        isOwn={isOwn}
      />
    </>
  )
}

export default Schedule