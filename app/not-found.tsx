import Link from 'next/link'
import { getCurrentUser } from './utils/supabase/auth';
import { redirect } from 'next/navigation';
import { getUser } from './utils/supabase/supabaseFunctions';
import { isAdminUser } from './utils/validation';
import Main from './components/layouts/Main';
import SectionField from './components/layouts/SectionField';
 
export default async function NotFound() {
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
        <SectionField sectionTitle="404 Not Found">
          <div>
            <p className="mb-2">ページが見つかりませんでした。</p>
            <Link 
              href="/"
              className="inline-flex justify-center items-center px-3 py-1.5 text-sm/6 text-black font-semibold border border-gray-500 rounded-md bg-white"
            >
              ホームへ戻る
            </Link>
          </div>
        </SectionField>
      </Main>
    </>

  )
}