import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../utils/supabase/auth';
import UserList from "../components/dashboard/UserList";
import MyStatus from '../components/dashboard/MyStatus';
import SectionField from '../components/layouts/SectionField';


export default async function DashBoard() {
  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
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
          <UserList userId={authUser.id}/>
        </div>
      </div>
    </>
  );
}
