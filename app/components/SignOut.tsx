'use client'
import React, { useRef, useState } from 'react';
import Button from '../components/elements/Button';
import Icon from '../components/elements/Icon';
import ConfirmModal from '../components/layouts/ConfirmModal';
import { BASE_URL } from '../constants/paths';
import { useToast } from '../context/ToastContext';


const SignOutButton = () => {

  const { showToast } = useToast();

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
        showToast(`${data.error}`, 'error');
        processing.current = false;
        return
			}
      
      window.location.replace('/login');
      processing.current = false;
		}catch (error) {
			console.error("fetch Error:", error);
      showToast('サインアウト処理に失敗しました、ネットワーク接続を確認してください', 'error');
      processing.current = false;
		}

  }
  
  return (
    <>
      <Button
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenModal(e)}
        variant="danger"
        size="medium"
        form="square"
        position="center"
        className="max-lg:w-[40px] max-lg:h-[40px] max-lg:p-2 max-lg:rounded-full"
      >
        <div className="max-lg:hidden">
          サインアウト
        </div>
        <div className="hidden max-lg:block">
          <Icon icon="signout" size={20} className="text-white" />
        </div>
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        title="サインアウト"
        message="サインアウトしますか？"
        setter={setIsOpen}
      >
        <form onSubmit={handleSignOutSubmit}>
          <Button
            type="submit"
            variant="danger"
            size="medium"
            form="square"
            position="center"
          >
            サインアウト
          </Button>
        </form>
      </ConfirmModal>
    </>
  );
}

export default SignOutButton