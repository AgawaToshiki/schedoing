'use client'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import Button from '../../components/elements/Button';
import ConfirmModal from '../../components/layouts/ConfirmModal';
import { BASE_URL } from '../../constants/paths';


type Props = {
  id: string;
}


const DeleteUser = ({ id }: Props) => {

	const router = useRouter();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const processing = useRef<boolean>(false);

	const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

	const handleDeleteSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(processing.current) {
			return
		}
		processing.current = true;
		try {
			const response = await fetch(`${BASE_URL}/api/users/${id}`, {
				cache: 'no-store',
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const data = await response.json();

			if(!response.ok) {
				console.error(response.status, data.error);
				alert(`${response.status}:${data.error}`);
				processing.current = false;
			}

			setIsOpen(false);
      router.refresh();
			processing.current = false;
		}catch (error) {
			console.error("fetch Error:", error);
      alert("ユーザー削除に失敗しました。ネットワーク接続を確認してください。");
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

export default DeleteUser