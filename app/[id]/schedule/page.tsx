import React from 'react'
import { redirect } from 'next/navigation';
import { getUserWithSchedules, getUser, isAdminUser } from '../../utils/supabase/supabaseFunctions';
import { getCurrentUser } from '../../utils/supabase/auth';
import Main from '../../components/layouts/Main';
import SchedulePanel from '../../components/schedule/SchedulePanel';
import SectionField from '../../components/layouts/SectionField';
import RegisterSchedule from '../../components/schedule/RegisterSchedule';


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

  const data = await getUserWithSchedules(params.id);
  if(!data){
    throw new Error("User does not exist");
  }

  const isOwn: boolean = authUser.id === params.id

  return (
    <>
      <Main isAdmin={isAdmin} id={user.id}>
        {!isOwn && (
          <div className="mb-6">
            {data?.displayName}
          </div>
        )}
        {user.id === params.id && (
          <div className="mb-10">
            <SectionField sectionTitle="新規スケジュール">
              <RegisterSchedule isOwn={isOwn}/>
            </SectionField>
          </div>
        )}
        <SchedulePanel 
          schedulesData={data.schedules}
          userId={params.id}
          isOwn={isOwn}
        />
      </Main>
    </>
  )
}

export default Schedule