import { getAllUser, getUser, isAdminUser } from './utils/supabaseFunctions';
import { getCurrentUser } from './utils/auth';
import { redirect } from 'next/navigation'
import { Database } from '../database.types';
import Main from './components/layouts/Main';
import UserList from "./components/UserList";
import MyStatus from './components/MyStatus';


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

  return (
    <>
      <Main isAdmin={isAdmin}>
        <div className="flex flex-col">
          <div className="mb-6">
            <h2>マイステータス</h2>
          </div>
          <div className="flex mb-10">
            <MyStatus user={user}/>
          </div>
          <div className="mb-6">
            <h2>DashBoard</h2>
          </div>
          <div className="flex">
            <UserList data={data}/>
          </div>
        </div>
      </Main>
    </>
  );
}
