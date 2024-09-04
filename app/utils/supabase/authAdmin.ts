'use server'

import { createClient } from '@supabase/supabase-js'

export async function deleteUserFromAuth(id: string) {
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
  await supabaseAdmin.auth.admin.deleteUser(id);
}

export async function updateUserEmailFromAuth(userId: string, email: string) {
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

	await supabaseAdmin.auth.admin.updateUserById(userId, {
		email: email,
		email_confirm: true
	});
}
