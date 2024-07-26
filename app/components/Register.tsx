'use client'
import { useState } from 'react';
import { createUser } from '../actions/register';

export default function Register() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");

	const handleSubmit = async(formData: FormData) => {
		await createUser(formData);
		setEmail("");
		setPassword("");
		setDisplayName("");
	}

  return (
    <>
			<div>新規登録</div>
    	<form action={handleSubmit}>
				<label htmlFor="email">Email:</label>
				<input id="email" name="email" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} required />
				<label htmlFor="password">Password:</label>
				<input id="password" name="password" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} required />
				<label htmlFor="displayName">DisplayName:</label>
				<input id="displayName" name="displayName" type="text" value={displayName} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setDisplayName(e.target.value)} required/>
				<button>ユーザー登録</button>
    	</form>
    </>
  )
}