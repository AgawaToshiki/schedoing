'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@supabase/supabase-js'

export async function createUser(formData: FormData) {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

	if (!supabaseUrl || !supabaseServiceRole) {
		throw new Error();
	}
	const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		}
	})
	const { data: currentUserData } = await supabaseAdmin.auth.getUser();
	const { data: roleData } = await supabaseAdmin.from("users").select('role').eq('id', currentUserData.user?.id).single();
	if(!roleData || roleData.role !== 'admin'){
			throw Error('権限がありません')
	}

  const registerData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
		email_confirm: true
  }

  const userData = {
    email: formData.get('email') as string,
    role: 'user',
  }

  const { data: { user }, error: signUpError } = await supabaseAdmin.auth.admin.createUser(registerData)
  console.log(user)

  if (signUpError) {
    console.log(signUpError.message);
    redirect('/error')
  }
  
  const { error: insertError } = await supabaseAdmin.from('users').insert({ id: user?.id, email: userData.email, role: userData.role })

  if (insertError) {
    console.log(insertError.message);
    redirect('/error')
  }

}