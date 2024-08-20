import React from 'react'
import { redirect } from 'next/navigation';
import { getSchedule, getUser, isAdminUser } from '@/app/utils/supabaseFunctions'
import { getCurrentUser } from '@/app/utils/auth';
import Main from '../../components/layouts/Main';

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
          <div key={schedule.id}>
            {schedule.title}
          </div>
        ))}
      </div>
    </Main>

    </>
  )
}

export default Schedule