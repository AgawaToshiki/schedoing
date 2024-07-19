import { redirect } from 'next/navigation'
import { createUser } from './actions'
import { createClient } from '@/utils/supabase/server'

export default async function Register() {
const supabase = createClient()
const { data: { user }, error } = await supabase.auth.getUser();
if (error || !user) {
    redirect('/login')
}

const { data: roleData } = await supabase.from("users").select('role').eq('id', user?.id).single();
if(!roleData || roleData.role !== 'admin'){
    redirect('/')
}
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={createUser}>ユーザー登録</button>
    </form>
  )
}