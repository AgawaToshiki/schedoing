import { getAllUser } from './utils/supabaseFunctions';
import { getCurrentUser } from './utils/auth';
import { Database } from '../database.types';
import UserList from "./components/UserList";
import SignOutButton from "./components/SignOutButton";

type User = Database['public']['Tables']['users']['Row'];

export default async function DashBoard() {
  await getCurrentUser();
  const data: User[] | null = await getAllUser();

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>DashBoard</div>
          <SignOutButton/>
        </div>
        <div className="flex bg-blue-100">
          <UserList data={data}/>
        </div>
      </div>
    </>
  );
}
