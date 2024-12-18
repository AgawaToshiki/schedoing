'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../../components/elements/Input';
import Button from '../../components/elements/Button';
import Ellipses from '../../components/elements/Ellipses';
import ErrorMessage from '../../components/ErrorMessage';
import { registerValidation } from '../../utils/validation';
import { handleSetEmptyErrorMessage, handleSetEmailErrorMessage, handleSetPasswordErrorMessage } from '../../utils/functions';
import { BASE_URL } from '../../constants/paths';


export default function RegisterUser() {

	const router = useRouter();
	
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");
	const [disabled, setDisabled] = useState<boolean>(true);
	const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
	const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState<string>("");
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
		if(isProcessing) {
			return
		}
		setIsProcessing(true);
		try {
			const response = await fetch(`${BASE_URL}/api/users`, {
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
				setIsProcessing(false);
				return
			}

			setEmail("");
			setPassword("");
			setDisplayName("");

      router.refresh();
			setIsProcessing(false);
		}catch (error) {
			console.error("fetch Error:", error);
      alert("ユーザー登録に失敗しました。ネットワーク接続を確認してください。");
			setIsProcessing(false);
		}
	}

  return (
    <>
    	<form onSubmit={handleRegisterSubmit}>
				<div className="flex flex-col max-w-[300px] mb-6 max-md:mb-4">
					<div className="mb-2">
						<div>
							<label htmlFor="email">Email</label>
						</div>
						<Input
							id="email"
							name="email"
							type="email"
							value={email}
							errorMessage={emailErrorMessage}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
							onBlur={() => handleSetEmailErrorMessage(isValidEmail, isEmptyEmail, setEmailErrorMessage)}
							required
						/>
						<ErrorMessage errorMessage={emailErrorMessage} />
					</div>
					<div className="mb-2">
						<div>
							<label htmlFor="password">Password</label>
						</div>
						<Input
							id="password"
							name="password"
							type="password"
							value={password}
							errorMessage={passwordErrorMessage}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
							onBlur={() => handleSetPasswordErrorMessage(isValidPassword, isEmptyPassword, isCheckPasswordLength, setPasswordErrorMessage)}
							required
						/>
						<ErrorMessage errorMessage={passwordErrorMessage} />
					</div>
					<div className="mb-2">
						<div>
							<label htmlFor="displayName">DisplayName</label>
						</div>
						<Input
							id="displayName"
							name="displayName"
							type="text"
							value={displayName}
							errorMessage={displayNameErrorMessage}
							onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setDisplayName(e.target.value)}
							onBlur={() => handleSetEmptyErrorMessage(isEmptyDisplayName, setDisplayNameErrorMessage)}
							required
						/>
						<ErrorMessage errorMessage={displayNameErrorMessage} />
					</div>
				</div>
				<Button
					type="submit"
					disabled={disabled}
					variant="primary"
					size="medium"
					form="square"
					position="center"
				>
					{isProcessing ? (
						<Ellipses>登録中</Ellipses>
					) : (
						"登録する"
					)}
				</Button>
    	</form>
    </>
  )
}