'use client'
import React, { useState } from 'react';
import Button from '../../components/elements/Button';
import Modal from '../../components/layouts/Modal';
import EditUserForm from '../../components/user/EditUserForm';
import { User } from '../../types';


type Props = {
  user: User;
}

const EditUser = ({ user }: Props) => {

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
				variant="primary"
				size="medium"
				form="square"
        position="center"
			>
				編集
			</Button>
			{isOpen && (
        <Modal isOpen={isOpen} setter={setIsOpen} title="ユーザー編集">
          <EditUserForm user={user} setter={setIsOpen}/>
        </Modal>
      )}
    </>
    
  )
}

export default EditUser