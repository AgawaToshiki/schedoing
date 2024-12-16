'use client'
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation';
import Button from '../../components/elements/Button';
import { BASE_URL } from '../../constants/paths';


type Props = {
  id: string;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}


const DeleteUserForm = ({ id, setter }: Props) => {

	const router = useRouter();

	const processing = useRef<boolean>(false);

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

			setter(false);
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
      <form onSubmit={handleDeleteSubmit}>
        <Button
					type="submit"
          variant="danger"
          size="medium"
          form="square"
					position="center"
        >
          削除する
        </Button>
      </form>
		</>
  )
}

export default DeleteUserForm