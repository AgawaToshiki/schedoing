import { getUser } from '../utils/supabase/supabaseFunctions';
import { getCurrentUser } from '../utils/supabase/auth';
import { isAdminUser } from '../utils/validation';
import { redirect } from 'next/navigation'
import Main from '../components/layouts/Main';
import SectionField from '../components/layouts/SectionField';


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

  console.log(user.is_reset_schedules);


  return (
    <>
      <Main isAdmin={isAdmin} id={authUser.id}>
        <div className="flex flex-col mb-10">
          <SectionField sectionTitle="設定">
            <div>test</div>
            {/* headressuiのswitchを利用して設定の変更を行いたい。 */}
          </SectionField>
        </div>
      </Main>
    </>
  );
}
