'use client'
import { useEffect, useState } from 'react';
import { login } from '../actions/login'
import SectionField from '../components/layouts/SectionField';
import Button from '../components/elements/button/Button';
import { formValidation } from '../utils/validation';

export default function Login() {
  const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const { loginFormValidation } = formValidation();

  useEffect(() => {
    const isValid = loginFormValidation(email, password);
    setDisabled(!isValid);
	}, [email, password])

  const handleLoginSubmit = async(formData: FormData) => {
		const result = await login(formData);
		if(result && result.error){
			alert(result.message);
			return
		}
	}

  return (
    <div className="flex flex-col p-6 h-screen bg-blue-100 overflow-hidden">
      <SectionField sectionTitle="ログイン">
        <form action={handleLoginSubmit}>
          <div className="flex flex-col max-w-[300px] mb-6">
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
          </div>
          <Button
            variant="primary"
            size="medium"
            form="square"
            attrs={
              {
                type: "submit",
                disabled: isDisabled,
              }
            }
          >
            ログイン
          </Button>
        </form>
      </SectionField>
    </div>
  )
}