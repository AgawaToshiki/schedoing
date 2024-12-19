'use server'

import { createClient } from '@supabase/supabase-js';
import { User } from "@supabase/supabase-js";
import { APIError } from '@/app/utils/exceptions';

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
  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
	if(error) {
    if(error.status){
      throw new APIError(error.status, `${error.message}`);
    }
    throw new Error(error.message);
	}
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

	const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
		email: email,
		email_confirm: true
	});

	if(error) {
    if(error.status){
      throw new APIError(error.status, `${error.message}`);
    }
    throw new Error(error.message);
	}
}

export async function createUserFromAuth(email: string, password: string): Promise<User | null>{
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
		email, 
		password, 
		email_confirm: true 
	}
	const { data: { user }, error } = await supabaseAdmin.auth.admin.createUser(registerData);
	if(error) {
    if(error.status){
      throw new APIError(error.status, `${error.message}`);
    }
    throw new Error(error.message);
	}
	return user

}
