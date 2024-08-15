import { getAllUser } from './utils/supabaseFunctions';
import { getCurrentUser } from './utils/auth';
import { redirect } from 'next/navigation'
import { Database } from '../database.types';
import UserList from "./components/UserList";


type User = Database['public']['Tables']['users']['Row'];

export default async function DashBoard() {
  const userId = await getCurrentUser();
  if(!userId){
		redirect('/login')
	}
  const data: User[] | null = await getAllUser();

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>DashBoard</div>
        </div>
        <div className="flex bg-blue-100">
          <UserList data={data}/>
        </div>
      </div>
    </>
  );
}
