'use client'
import { useEffect, useState } from 'react';
import { createUser } from '../actions/register';
import Button from '../components/elements/button/Button';
import { formValidation } from '../utils/functions';

export default function RegisterUser() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");
	const [isDisabled, setDisabled] = useState<boolean>(true);

	const { registerFormValidation } = formValidation();

	useEffect(() => {
		const isValid = registerFormValidation(email, password, displayName)
		setDisabled(!isValid);
	}, [email, password, displayName])


	const handleRegisterSubmit = async(formData: FormData) => {
		await createUser(formData);
		setEmail("");
		setPassword("");
		setDisplayName("");
	}

  return (
    <>
    	<form action={handleRegisterSubmit}>
				<div className="flex flex-col w-[300px] mb-6">
					<div className="mb-2">
						<div>
							<label htmlFor="email">Email</label>
						</div>
						<input 
							id="email"
							name="email"
							type="email"
							className="w-full border border-gray-200 shadow-md text-base block p-1 h-12"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-2">
						<div>
							<label htmlFor="password">Password</label>
						</div>
						<input
							id="password"
							name="password"
							type="password"
							className="w-full border border-gray-200 shadow-md text-base block p-1 h-12"
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="mb-2">
						<div>
							<label htmlFor="displayName">DisplayName</label>
						</div>
						<input
							id="displayName"
							name="displayName"
							type="text"
							className="w-full border border-gray-200 shadow-md text-base block p-1 h-12"
							value={displayName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setDisplayName(e.target.value)}
							required
						/>
					</div>
				</div>
				<Button
					variant="primary"
					size="medium"
					form="square"
					attrs={
						{
							type: "submit",
							disabled: isDisabled
						}
					}
				>
					登録
				</Button>
    	</form>
    </>
  )
}