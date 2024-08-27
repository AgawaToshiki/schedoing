import React from 'react'
import { redirect } from 'next/navigation';
import { getSchedule, getUser, isAdminUser } from '../../utils/supabaseFunctions';
import { getCurrentUser } from '../../utils/auth';
import Main from '../../components/layouts/Main';
import SchedulePanel from '../../components/SchedulePanel';
import SectionField from '../../components/layouts/SectionField';
import RegisterSchedule from '../../components/RegisterSchedule';


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
  if(!data){
    redirect('/login')
  }

  return (
    <>
      <Main isAdmin={isAdmin} id={user.id}>
        <div className="mb-6">
          {data?.displayName}
        </div>
        {user.id === params.id && (
          <div className="mb-10">
            <SectionField sectionTitle="新規スケジュール">
              <RegisterSchedule />
            </SectionField>
          </div>
        )}
        <SchedulePanel schedules={data.schedules}/>
      </Main>
    </>
  )
}

export default Schedule