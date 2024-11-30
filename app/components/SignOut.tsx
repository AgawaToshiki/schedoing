'use client'
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/elements/Button';
import Icon from '../components/elements/Icon';
import ConfirmModal from '../components/layouts/ConfirmModal';
import { BASE_URL } from '../constants/paths';


const SignOutButton = () => {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const processing = useRef<boolean>(false);

	const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  const handleSignOutSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(processing.current) {
      return
    }
    processing.current = true;
		try {
			const response = await fetch(`${BASE_URL}/api/auth/signout`, {
				cache: 'no-store',
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const data = await response.json();

			if(!response.ok) {
        alert(`サインアウト処理に失敗しました。エラー：${data.error}`);
        processing.current = false;
        return
			}

      router.push('/login');
      processing.current = false;
		}catch (error) {
			console.error("fetch Error:", error);
      alert("サインアウト処理に失敗しました。ネットワーク接続を確認してください。");
      processing.current = false;
		}

  }
  
  return (
    <>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenModal(e)}
        variant="danger"
        size="medium"
        form="square"
        attrs={
          { type: "button" }
        }
        className="max-lg:p-2 max-lg:rounded-full"
      >
        <div className="max-lg:hidden">
          サインアウト
        </div>
        <div className="hidden max-lg:block">
          <Icon icon="close" size={20} className="text-white" />
        </div>
      </Button>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          title="サインアウト"
          message="サインアウトしますか？"
          setter={setIsOpen}
        >
          <form onSubmit={handleSignOutSubmit}>
            <Button
              variant="danger"
              size="medium"
              form="square"
              attrs={
                { type: "submit" }
              }
            >
              サインアウト
            </Button>
          </form>
        </ConfirmModal>
      )}

    </>
  );
}

export default SignOutButton