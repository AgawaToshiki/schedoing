import { getAllUser, getUser } from './utils/supabase/supabaseFunctions';
import { getCurrentUser } from './utils/supabase/auth';
import { isAdminUser } from './utils/validation';
import { redirect } from 'next/navigation'
import Main from './components/layouts/Main';
import UserList from "./components/dashboard/UserList";
import MyStatus from './components/dashboard/MyStatus';
import SectionField from './components/layouts/SectionField';


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

  const data = await getAllUser();
  if(!data) {
    throw new Error("User does not exist");
  }

  return (
    <>
      <Main isAdmin={isAdmin} id={authUser.id}>
        <div className="flex flex-col mb-6">
          <SectionField sectionTitle="マイステータス">
            <MyStatus user={user}/>
          </SectionField>
        </div>
        <div className="mt-6">
          <div className="mb-6">
            <h2>DashBoard</h2>
          </div>
          <div className="p-6">
            <UserList data={data} userId={authUser.id}/>
          </div>
        </div>
      </Main>
    </>
  );
}
