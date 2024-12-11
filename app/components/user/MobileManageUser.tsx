'use client'
import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import EditUserForm from './EditUserForm';
import DeleteUserForm from './DeleteUserForm';
import Icon from '../elements/Icon';
import Modal from '../layouts/Modal';
import ConfirmModal from '../layouts/ConfirmModal';
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
          <MenuButton>
            <Icon icon="ellipsis" />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="absolute z-[200] rounded-xl border bg-gray-700 p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button
                onClick={handleOpenEditModal}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/20"
              >
                <Icon icon="edit" />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={handleOpenDeleteModal}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/20"
              >
                <Icon icon="delete" />
                Delete
              </button>
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