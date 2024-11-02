'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Button from '../components/elements/button/Button';
import ConfirmModal from '../components/layouts/ConfirmModal';


type Props = {
  id: string;
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const DeleteUserButton = ({ id }: Props) => {

	const router = useRouter();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

	const handleDeleteSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(`${base_url}/api/user/delete`, {
				cache: 'no-store',
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id })
			})

			const data = await response.json();

			if(!response.ok) {
				console.error(response.status, data.error);
				alert(`${response.status}:${data.error}`);
			}

			setIsOpen(false);
      router.refresh();
		}catch (error) {
			console.error("fetch Error:", error);
      alert("ユーザー削除に失敗しました。ネットワーク接続を確認してください。");
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
				削除
			</Button>
			{isOpen && (
        <ConfirmModal 
          isOpen={isOpen}
          title="ユーザー削除"
					message="本当に削除しますか？"
          setter={setIsOpen}
        >
          <form onSubmit={handleDeleteSubmit}>
            <Button
              variant="danger"
              size="medium"
							form="square"
              attrs={
                { type: "submit" }
              }
            >
              削除する
            </Button>
          </form>
        </ConfirmModal>
      )}
		</>
  )
}

export default DeleteUserButton