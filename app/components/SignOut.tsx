'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/elements/Button';
import ConfirmModal from '../components/layouts/ConfirmModal';


const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const SignOutButton = () => {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  const handleSignOutSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		try {
			const response = await fetch(`${base_url}/api/auth/signout`, {
				cache: 'no-store',
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const data = await response.json();

			if(!response.ok) {
        alert(`サインアウト処理に失敗しました。エラー：${data.error}`);
        return
			}

      router.push('/login');
		}catch (error) {
			console.error("fetch Error:", error);
      alert("サインアウト処理に失敗しました。ネットワーク接続を確認してください。");
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
      >
        サインアウト
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