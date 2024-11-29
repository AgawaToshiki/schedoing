'use client'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionField from '../../components/layouts/SectionField';
import Button from '../../components/elements/Button';
import { loginValidation } from '../../utils/validation';
import { handleSetEmailErrorMessage, handleSetPasswordErrorMessage } from '../../utils/functions';
import { BASE_URL } from '../../constants/paths';


export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>(""); 

  const processing = useRef<boolean>(false);

  const { 
    isValid,
    isValidEmail,
    isEmptyEmail,
    isValidPassword,
    isCheckPasswordLength,
    isEmptyPassword
  } = loginValidation(email, password);

  useEffect(() => {
    setDisabled(!isValid);
	}, [email, password]);

  const handleLoginSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    if(processing.current) {
      return
    }
    processing.current = true;
		try {
			const response = await fetch(`${BASE_URL}/api/auth/login`, {
				cache: 'no-store',
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			})

			const data = await response.json();

			if(!response.ok) {
        if(response.status === 400){
          setLoginErrorMessage("ログイン情報が正しくありません");
          processing.current = false;
          return
        }
        alert(`ログインに失敗しました。エラー：${data.error}`);
        processing.current = false;
        return
			}
      router.push('/');
      processing.current = false;
		}catch (error) {
			console.error("fetch Error:", error);
      alert("ログインに失敗しました。ネットワーク接続を確認してください。");
      processing.current = false;
		}

	}

  return (
    <div className="flex flex-col p-6 h-screen bg-blue-100 overflow-hidden">
      <SectionField sectionTitle="ログイン">
        <form onSubmit={handleLoginSubmit}>
          <div className="flex flex-col max-w-[300px] mb-6">
            <div className="mb-2">
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <input 
                id="email"
                name="email"
                type="email"
                className={`w-full border border-gray-200 shadow-md text-base block px-2 h-12 ${emailErrorMessage && ("border-red-400")}`}
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
                className={`w-full border border-gray-200 shadow-md text-base block px-2 h-12 ${passwordErrorMessage && ("border-red-400")}`}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
                onBlur={() => handleSetPasswordErrorMessage(isValidPassword, isEmptyPassword, isCheckPasswordLength, setPasswordErrorMessage)}
                required
              />
              {passwordErrorMessage && (<p className="pt-2 text-sm text-red-400">{passwordErrorMessage}</p>)}
            </div>
            {loginErrorMessage && (<p className='pt-2 text-sm text-red-400'>{loginErrorMessage}</p>)}
          </div>
          <Button
            variant="primary"
            size="medium"
            form="square"
            attrs={
              {
                type: "submit",
                disabled: disabled,
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