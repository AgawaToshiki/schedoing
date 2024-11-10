'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/elements/button/Button';
import { registerValidation } from '../utils/validation';
import { handleSetEmptyErrorMessage, handleSetEmailErrorMessage, handleSetPasswordErrorMessage } from '../utils/functions';

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export default function RegisterUser() {

	const router = useRouter();
	
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");
	const [disabled, setDisabled] = useState<boolean>(true);
	const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
	const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState<string>("");

	const {
		isValid,
		isValidEmail,
		isEmptyEmail,
		isValidPassword,
		isCheckPasswordLength,
		isEmptyPassword,
		isEmptyDisplayName
	} = registerValidation(email, password, displayName);

	useEffect(() => {
		setDisabled(!isValid);
	}, [email, password, displayName])


	const handleRegisterSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(`${base_url}/api/users`, {
				cache: 'no-store',
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password, displayName })
			})


			const data = await response.json();

			if(!response.ok) {
				console.error(response.status, data.error);
        alert(`${response.status}:${data.error}`);
			}

			setEmail("");
			setPassword("");
			setDisplayName("");
      router.refresh();
		}catch (error) {
			console.error("fetch Error:", error);
      alert("ユーザー登録に失敗しました。ネットワーク接続を確認してください。");
		}
	}

  return (
    <>
    	<form onSubmit={handleRegisterSubmit}>
				<div className="flex flex-col max-w-[300px] mb-6">
					<div className="mb-2">
						<div>
							<label htmlFor="email">Email</label>
						</div>
						<input 
							id="email"
							name="email"
							type="email"
							className={`w-full border border-gray-200 shadow-md text-base block p-1 h-12 ${emailErrorMessage && ("border-red-400")}`}
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
							onBlur={() => handleSetEmailErrorMessage(isValidEmail, isEmptyEmail, setEmailErrorMessage)}
							required
						/>
						{emailErrorMessage && (<p className="pt-2 text-sm text-red-400">{emailErrorMessage}</p>)}
					</div>
					<div className="mb-2">
						<div>
							<label htmlFor="password">Password</label>
						</div>
						<input
							id="password"
							name="password"
							type="password"
							className={`w-full border border-gray-200 shadow-md text-base block p-1 h-12 ${passwordErrorMessage && ("border-red-400")}`}
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
							onBlur={() => handleSetPasswordErrorMessage(isValidPassword, isEmptyPassword, isCheckPasswordLength, setPasswordErrorMessage)}
							required
						/>
						{passwordErrorMessage && (<p className="pt-2 text-sm text-red-400">{passwordErrorMessage}</p>)}
					</div>
					<div className="mb-2">
						<div>
							<label htmlFor="displayName">DisplayName</label>
						</div>
						<input
							id="displayName"
							name="displayName"
							type="text"
							className={`w-full border border-gray-200 shadow-md text-base block p-1 h-12 ${displayNameErrorMessage && ("border-red-400")}`}
							value={displayName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setDisplayName(e.target.value)}
							onBlur={() => handleSetEmptyErrorMessage(isEmptyDisplayName, setDisplayNameErrorMessage)}
							required
						/>
						{displayNameErrorMessage && (<p className="pt-2 text-sm text-red-400">{displayNameErrorMessage}</p>)}
					</div>
				</div>
				<Button
					variant="primary"
					size="medium"
					form="square"
					attrs={
						{
							type: "submit",
							disabled: disabled
						}
					}
				>
					登録
				</Button>
    	</form>
    </>
  )
}