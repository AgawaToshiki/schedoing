'use client'
import React, { useState } from 'react';
import DeleteUserForm from '../../components/user/DeleteUserForm';
import Button from '../../components/elements/Button';
import ConfirmModal from '../../components/layouts/ConfirmModal';


type Props = {
  id: string;
}

const DeleteUser = ({ id }: Props) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  return (
		<>
			<Button
				type="button"
				onClick={handleOpenModal}
				variant="danger"
				size="medium"
				form="square"
				position="center"
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
					<DeleteUserForm id={id} setter={setIsOpen} />
        </ConfirmModal>
      )}
		</>
  )
}

export default DeleteUser