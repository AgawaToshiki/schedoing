'use client'
import { useEffect, useState } from 'react';
import { createUser } from '../actions/register';
import Button from '../components/elements/button/Button';
import { registerValidation } from '../utils/validation';

export default function RegisterUser() {
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


	const handleRegisterSubmit = async(formData: FormData) => {
		const result = await createUser(formData);
		if(result && result.error){
			alert(result.message);
			return
		}
		setEmail("");
		setPassword("");
		setDisplayName("");
	}

  const handleBlurEmail = () => {
    if(isEmptyEmail) {
      setEmailErrorMessage("入力必須項目です");
      return
    }
    if(!isValidEmail) {
      setEmailErrorMessage("メールアドレスの形式で入力してください");
      return
    }
    setEmailErrorMessage("");
  }

	const handleBlurPassword = () => {
    if(isEmptyPassword) {
      setPasswordErrorMessage("入力必須項目です")
      return
    }
    if(!isCheckPasswordLength) {
      setPasswordErrorMessage("8文字以上で入力してください");
      return
    }
    if(!isValidPassword) {
      setPasswordErrorMessage("半角英数字と1つ以上の大文字を含めてください");
      return
    }
    setPasswordErrorMessage("");
  }

	const handleBlurDisplayName = () => {
    if(isEmptyDisplayName) {
      setDisplayNameErrorMessage("入力必須項目です")
      return
    }
    setDisplayNameErrorMessage("");
  }

  return (
    <>
    	<form action={handleRegisterSubmit}>
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
							onBlur={handleBlurEmail}
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
							onBlur={handleBlurPassword}
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
							onBlur={handleBlurDisplayName}
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