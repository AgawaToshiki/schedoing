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

  const registerData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
		email_confirm: true
  }

  const userData = {
		displayName: formData.get('displayName') as string,
		role: 'user',
  }

  const { data: { user }, error: signUpError } = await supabaseAdmin.auth.admin.createUser(registerData)

  if (signUpError) {
    console.log(signUpError.message);
    redirect('/error')
  }
  
  const { error: insertError } = await supabaseAdmin.from('users').insert({ id: user?.id, email: registerData.email, displayName: userData.displayName, role: userData.role })

  if (insertError) {
    console.log(insertError.message);
    redirect('/error')
  }
	redirect('/user')
}