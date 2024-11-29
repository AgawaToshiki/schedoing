import React from 'react';
import SignOutButton from '../SignOut';
import Navigation from '../../components/layouts/Navigation';
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { redirect } from 'next/navigation';
import { getUser } from '@/app/utils/supabase/supabaseFunctions';
import { isAdminUser } from "@/app/utils/functions";

const Header = async() => {
  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}
  const user = await getUser(authUser.id);
  if(!user){
    redirect('/login')
  }
  const isAdmin = isAdminUser(user);

  return (
    <header className="sticky top-0 h-screen bg-blue-400">
      <div className="flex flex-col w-[275px] h-full overflow-y-auto scrollbar">
        <div className="sticky top-0 p-6 bg-blue-400">
          <h1 className="text-2xl select-none">Schedoing</h1>
        </div>
        <div className="px-6">
          <Navigation isAdmin={isAdmin} id={user.id} />
        </div>
        <div className="sticky bottom-0 p-6 mt-auto bg-blue-400">
          <SignOutButton />
        </div>
      </div>
    </header>
  )
}

export default Header