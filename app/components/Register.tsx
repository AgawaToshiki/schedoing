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
    	<form action={handleSubmit}>
				<div className="flex flex-col">
					<div>
						<div>
							<label htmlFor="email">Email</label>
						</div>
						<input 
							id="email"
							name="email"
							type="email"
							className="border"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<div>
							<label htmlFor="password">Password</label>
						</div>
						<input
							id="password"
							name="password"
							type="password"
							className="border"
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
							required
						/>
					</div>
					<div>
						<div>
							<label htmlFor="displayName">DisplayName</label>
						</div>
						<input
							id="displayName"
							name="displayName"
							type="text"
							className="border"
							value={displayName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setDisplayName(e.target.value)}
							required
						/>
					</div>
				</div>
				<button type="submit" className="p-1 border bg-green-400">登録</button>
    	</form>
    </>
  )
}