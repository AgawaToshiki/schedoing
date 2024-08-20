import React from 'react'
import { redirect } from 'next/navigation';
import { getSchedule, getUser, isAdminUser } from '../../utils/supabaseFunctions';
import { getCurrentUser } from '../../utils/auth';
import Main from '../../components/layouts/Main';
import SchedulePanel from '../../components/SchedulePanel';

const Schedule = async({ params }: { params: { id: string } }) => {
  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}
  const user = await getUser(authUser.id);
  if(!user){
    redirect('/login')
  }

  const isAdmin = isAdminUser(user);

  const data = await getSchedule(params.id);

  return (
    <>
      <Main isAdmin={isAdmin}>
        <div>
          {data?.displayName}
          {data?.schedules.map((schedule) => (
            <div key={schedule.id} className="flex flex-col">
              <div>タイトル：{schedule.title}</div>
              <div>開始時刻：{schedule.start_time}</div>
              <div>終了時刻：{schedule.end_time}</div>
            </div>
          ))}
        </div>
        <SchedulePanel />
      </Main>
    </>
  )
}

export default Schedule