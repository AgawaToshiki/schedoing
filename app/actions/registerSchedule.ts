'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '../utils/auth'
import { updateStatus } from '../utils/supabaseFunctions';

export async function registerSchedule(formData: FormData) {

}