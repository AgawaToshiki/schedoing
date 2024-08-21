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
        <div className="mb-6">
          {data?.displayName}
        </div>
        <SchedulePanel schedules={data?.schedules}/>
      </Main>
    </>
  )
}

export default Schedule