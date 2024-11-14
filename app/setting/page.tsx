import { getUser } from '../utils/supabase/supabaseFunctions';
import { getCurrentUser } from '../utils/supabase/auth';
import { isAdminUser } from '../utils/validation';
import { redirect } from 'next/navigation'
import Main from '../components/layouts/Main';
import SectionField from '../components/layouts/SectionField';
import SettingList from '../components/setting/SettingList';


export default async function Setting() {
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
    <>
      <Main isAdmin={isAdmin} id={authUser.id}>
        <div className="flex flex-col">
          <SectionField sectionTitle="設定">
            <SettingList user={user}/>
          </SectionField>
        </div>
      </Main>
    </>
  );
}
