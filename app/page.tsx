import { getAllUser } from './utils/supabaseFunctions';
import { getCurrentUser } from './utils/auth';
import UserList from "./components/UserList";
import SignOutButton from "./components/SignOutButton";

export default async function DashBoard() {
  await getCurrentUser();
  const data = await getAllUser();

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
