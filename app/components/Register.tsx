'use client'
import { useEffect, useState } from 'react';
import { createUser } from '../actions/register';
import Button from '../components/elements/button/Button'

export default function Register() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");
	const [disabled, setDisabled] = useState<boolean>(true);

	const checkChangeState = (): void => {
    if(!email || !password || !displayName){
      setDisabled(true);
    }else{
      setDisabled(false);
    }
  }

  useEffect(() => {
    checkChangeState();
  }, [email, password, displayName])

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
				<Button
					variant="primary"
					size="medium"
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