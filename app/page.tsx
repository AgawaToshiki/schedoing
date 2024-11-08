import { getAllUser, getUser } from './utils/supabase/supabaseFunctions';
import { getCurrentUser } from './utils/supabase/auth';
import { isAdminUser } from './utils/validation';
import { redirect } from 'next/navigation'
import { Database } from '../database.types';
import Main from './components/layouts/Main';
import UserList from "./components/UserList";
import MyStatus from './components/MyStatus';
import SectionField from './components/layouts/SectionField';


type User = Database['public']['Tables']['users']['Row'];

export default async function DashBoard() {
  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}
  const user = await getUser(authUser.id);
  if(!user){
    redirect('/login')
  }
  const isAdmin = isAdminUser(user);

  const data: User[] | null = await getAllUser();
  if(!data) {
    throw new Error("User does not exist");
  }

  return (
    <>
      <Main isAdmin={isAdmin} id={authUser.id}>
        <div className="flex flex-col mb-10">
          <SectionField sectionTitle="マイステータス">
            <MyStatus user={user}/>
          </SectionField>
        </div>
        <div className="mb-6">
          <h2>DashBoard</h2>
        </div>
        <div className="flex flex-col w-full h-full p-6 border border-gray-200">
          <UserList data={data} userId={authUser.id}/>
        </div>
      </Main>
    </>
  );
}
