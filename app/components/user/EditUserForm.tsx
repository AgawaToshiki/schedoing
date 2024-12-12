'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Button from '../../components/elements/Button';
import Icon from '../../components/elements/Icon';
import Ellipses from '../../components/elements/Ellipses';
import { updateValidation } from '../../utils/validation'
import { handleSetEmptyErrorMessage, handleSetEmailErrorMessage } from '../../utils/functions';
import { User } from '../../types';
import { BASE_URL } from '../../constants/paths';


type Props = {
  user: User;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}


const EditUserForm = (props: Props) => {

  const router = useRouter();

  const [displayName, setDisplayName] = useState<string>(props.user.displayName);
  const [role, setRole] = useState<string>(props.user.role);
  const [email, setEmail] = useState<string>(props.user.email);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { isValid, isValidEmail, isEmptyEmail, isEmptyDisplayName } = updateValidation(email, displayName, role);

  const checkState = (): boolean => {
    const hasChanged = 
      displayName !== props.user.displayName ||
      role !== props.user.role ||
      email !== props.user.email
    return hasChanged && isValid
  }

  const changeDisabled = (): void => {
    setDisabled(!checkState());
  }

  useEffect(() => {
    changeDisabled();
  }, [role, displayName, email])

  const handleUpdateSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isProcessing) {
      return
    }
    setIsProcessing(true);
    try {
			const response = await fetch(`${BASE_URL}/api/users/${props.user.id}`, {
				cache: 'no-store',
				method: "PATCH",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ role, displayName, email })
			})


			const data = await response.json();

			if(!response.ok) {
				console.error(response.status, data.error);
        alert(`${response.status}:${data.error}`);
        setIsProcessing(false);
			}

      props.setter(false);
      router.refresh();
      setIsProcessing(false);
		}catch (error) {
      console.error("fetch Error:", error);
      alert("ユーザー更新に失敗しました。ネットワーク接続を確認してください。");
      setIsProcessing(false);
		}
  }

  return (
    <>
      <form onSubmit={handleUpdateSubmit}>
        <div className="flex flex-col mb-6">
          <div className="mb-2">
            <label htmlFor="editRole">権限</label>
            <div className="relative">
              <select
                name="role"
                id="editRole"
                value={role}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                className="w-full border rounded-sm border-gray-200 shadow-md block px-2 h-12 bg-white max-md:h-10"
                required
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
              <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[95%] pointer-events-none">
                <Icon icon="down" size={15} />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="editDisplayName">ユーザー名</label>
            <input
              type="text"
              name="displayName"
              id="editDisplayName"
              value={displayName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
							onBlur={() => handleSetEmptyErrorMessage(isEmptyDisplayName, setDisplayNameErrorMessage)}
              className={`w-full border rounded-sm border-gray-200 shadow-md block px-2 h-12 ${displayNameErrorMessage && ("border-red-400")} max-md:h-10`}
              required
            />
            {displayNameErrorMessage && (<p className="pt-2 text-sm text-red-400">{displayNameErrorMessage}</p>)}
          </div>
          <div>
            <label htmlFor="editEmail">メールアドレス</label>
            <input
              type="text"
              name="email"
              id="editEmail"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              onBlur={() => handleSetEmailErrorMessage(isValidEmail, isEmptyEmail, setEmailErrorMessage)}
              className={`w-full border rounded-sm border-gray-200 shadow-md block px-2 h-12 ${emailErrorMessage && ("border-red-400")} max-md:h-10`}
              required
            />
            {emailErrorMessage && (<p className="pt-2 text-sm text-red-400">{emailErrorMessage}</p>)}
          </div>
        </div>
        <div className="flex justify-end">
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
            {isProcessing ? (
              <Ellipses>更新中</Ellipses>
            ) : (
              "更新する"
            )}
          </Button>
        </div>
      </form>
    </>
  )
}

export default EditUserForm