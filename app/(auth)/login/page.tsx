'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionField from '../../components/layouts/SectionField';
import Button from '../../components/elements/Button';
import Ellipses from '../../components/elements/Ellipses';
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
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
    if(isProcessing) {
      return
    }
    setIsProcessing(true);
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
          setIsProcessing(false);
          return
        }
        alert(`ログインに失敗しました。エラー：${data.error}`);
        setIsProcessing(false);
        return
			}
      router.push('/');
      setIsProcessing(false);
		}catch (error) {
			console.error("fetch Error:", error);
      alert("ログインに失敗しました。ネットワーク接続を確認してください。");
      setIsProcessing(false);
		}

	}

  return (
    <div className="flex flex-col p-6 min-h-dvh bg-blue-100 overflow-hidden max-md:p-4">
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
                className={`w-full border rounded-sm shadow-md block px-2 h-12 ${emailErrorMessage ? ("border-red-400") : ("border-gray-200")} max-md:h-10`}
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
                className={`w-full border rounded-sm shadow-md block px-2 h-12 ${passwordErrorMessage ? ("border-red-400") : ("border-gray-200")} max-md:h-10`}
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
            {isProcessing ? (
              <Ellipses>ログイン中</Ellipses>
            ) : (
              "ログイン"
            )}
          </Button>
        </form>
      </SectionField>
    </div>
  )
}