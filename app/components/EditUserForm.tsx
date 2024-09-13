'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Button from '../components/elements/button/Button';
import Icon from '../components/elements/icon/Icon';
import { Database } from '@/database.types';
import { formValidation } from '../utils/functions'

type User = Database['public']['Tables']['users']['Row'];

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

  const { updateEmailValidation } = formValidation();
  const emailValidation = updateEmailValidation(email);

  const checkState = (): boolean => {
    const isSetState = !!displayName && !!email;
    const hasChanged = 
      displayName !== props.user.displayName ||
      role !== props.user.role ||
      email !== props.user.email
    return isSetState && hasChanged && emailValidation
  }

  const changeDisabled = (): void => {
    setDisabled(!checkState());
  }

  useEffect(() => {
    changeDisabled();
  }, [role, displayName, email])

  const handleUpdateSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!checkState()){
      console.log("Validation failed")
      return
    }

    try {
			const response = await fetch('../api/user/update', {
				cache: 'no-store',
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: props.user.id, role, displayName, email })
			})


			const data = await response.json();

			if(!response.ok) {
				console.error(data.error, data.status);
			}

      props.setter(false);
      router.refresh();
		}catch (error) {
			console.error("UpdateUser Error:", error)
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
                className="w-full border border-gray-200 shadow-md text-base block p-1 h-12 appearance-none"
                required
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
              <div className="absolute top-4 right-3 pointer-events-none">
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
              className="w-full border border-gray-200 shadow-md text-base block p-1 h-12"
              required
            />
          </div>
          <div>
            <label htmlFor="editEmail">メールアドレス</label>
            <input
              type="text"
              name="email"
              id="editEmail"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full border border-gray-200 shadow-md text-base block p-1 h-12"
              required
            />
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
            更新
          </Button>
        </div>
      </form>
    </>

  )
}

export default EditUserForm