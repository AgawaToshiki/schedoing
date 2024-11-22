'use client'
import React, { useState } from 'react'
import { Database } from '@/database.types';
import Button from '../../components/elements/Button';
import Modal from '../../components/layouts/Modal';
import EditUserForm from '../../components/user/EditUserForm';

type User = Database['public']['Tables']['users']['Row'];

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
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenModal(e)}
				variant="primary"
				size="medium"
				form="square"
				attrs={
					{ type: "button" }
				}
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