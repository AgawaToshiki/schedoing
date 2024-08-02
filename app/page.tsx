import { createClient } from '@/utils/supabase/server'
import SignOut from "./components/SignOut";
import { getCurrentUser } from './utils/server';

export default async function DashBoard() {
  const userId = await getCurrentUser();
  const supabase = createClient();
  const { data, error } = await supabase.from('users').select('id,created_at,email,role,displayName,status');

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>DashBoard</div>
          <SignOut id={userId}/>
        </div>
        <div className="flex bg-blue-100">
          {data?.map((user) => (
            <div className="flex items-center mx-4 p-4 border border-black rounded-lg bg-red-100" key={user.id}>
              <div className="p-4 bg-red-100">{user.displayName}</div>
              <div className={`w-4 h-4 rounded-full ${user.status === 'online' ? 'bg-green-400' : user.status === 'leave' ? 'bg-red-400' : 'bg-gray-400'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
