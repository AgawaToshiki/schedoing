import React from 'react';
import { getUser } from '../../utils/supabase/supabaseFunctions';
import { getCurrentUser } from '../../utils/supabase/auth';
import { redirect } from 'next/navigation'
import SectionField from '../../components/layouts/SectionField';
import SettingList from '../../components/setting/SettingList';


export default async function Setting() {
  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}
  const user = await getUser(authUser.id);
  if(!user){
    redirect('/login')
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <SectionField sectionTitle="設定">
          <SettingList user={user}/>
        </SectionField>
      </div>
    </>
  );
}
