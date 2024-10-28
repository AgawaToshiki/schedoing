import React from 'react'
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../utils/supabase/auth';
import { getUser } from '../../utils/supabase/supabaseFunctions';
import { isAdminUser } from '@/app/utils/validation';

type Props = {
  children: Readonly<React.ReactElement>
}

const ProtectRoute = async({ children }: Props) => {

  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}
  const user = await getUser(authUser.id);
	if(!user){
    redirect('/login')
  }
	const isAdmin = isAdminUser(user);
	if(!isAdmin) {
		redirect('/')
	}
  const childrenWithProps = React.cloneElement(children, { user, isAdmin });
  return (
    <>
      {childrenWithProps}
    </>
  )
}

export default ProtectRoute