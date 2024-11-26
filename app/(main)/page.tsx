import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getAllUser } from '../utils/supabase/supabaseFunctions';
import { getCurrentUser } from '../utils/supabase/auth';
import UserList from "../components/dashboard/UserList";
import MyStatus from '../components/dashboard/MyStatus';
import SectionField from '../components/layouts/SectionField';
import Loading from '../components/layouts/Loading';



export default async function DashBoard() {
  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}

  const GetUserList = async() => {
    const data = await getAllUser();
    if(!data) {
      throw new Error("User does not exist");
    }
    return (
      <>
        <UserList data={data} userId={authUser.id}/>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col mb-6">
        <SectionField sectionTitle="マイステータス">
          <MyStatus userId={authUser.id}/>
        </SectionField>
      </div>
      <div className="mt-6">
        <div className="mb-6">
          <h2>DashBoard</h2>
        </div>
        <div className="p-6">
          <Suspense fallback={<Loading />}>
            <GetUserList />
          </Suspense>
        </div>
      </div>
    </>
  );
}
