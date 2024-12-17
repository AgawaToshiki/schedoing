'use client'
import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import EditUserForm from '../../components/user/EditUserForm';
import DeleteUserForm from '../../components/user/DeleteUserForm';
import Button from '../../components/elements/Button';
import Icon from '../../components/elements/Icon';
import Modal from '../../components/layouts/Modal';
import ConfirmModal from '../../components/layouts/ConfirmModal';
import { User } from '@/app/types';

type Props = {
  user: User;
}

const MobileManageUser = ({ user }: Props) => {

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

	const handleOpenEditModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  }

  const handleOpenDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  }

  return (
    <>
      <div className="relative z-[100] flex justify-center items-center">
        <Menu>
          <MenuButton className="p-1 rounded-md data-[hover]:bg-gray-200">
            <Icon icon="ellipsis" />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="absolute z-[200] rounded-lg border bg-gray-700 p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <Button
                variant="transparent"
                size="medium"
                form="square"
                position="start"
                onClick={handleOpenEditModal}
                className="group w-full gap-2"
              >
                <Icon icon="edit" />
                Edit
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                variant="transparent"
                size="medium"
                form="square"
                position="start"
                onClick={handleOpenDeleteModal}
                className="group w-full gap-2"
              >
                <Icon icon="delete" />
                Delete
              </Button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} setter={setIsEditModalOpen} title="ユーザー編集">
          <EditUserForm user={user} setter={setIsEditModalOpen}/>
        </Modal>
      )}
      {isDeleteModalOpen && (
        <ConfirmModal 
          isOpen={isDeleteModalOpen}
          title="ユーザー削除"
					message="本当に削除しますか？"
          setter={setIsDeleteModalOpen}
        >
					<DeleteUserForm id={user.id} setter={setIsDeleteModalOpen} />
        </ConfirmModal>
      )}
    </>
  )
}

export default MobileManageUser