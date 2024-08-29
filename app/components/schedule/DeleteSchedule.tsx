'use client'
import React, { useState } from 'react'
import DeleteConfirmModal from '../DeleteConfirmModal';

type Props = {
  id: string;
}

const DeleteSchedule = ({ id }: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={(e) => handleOpenModal(e)} className="bg-red-400 hover:bg-red-200">削除</button>
      {isOpen && (
        <DeleteConfirmModal 
          isOpen={isOpen}
          id={id}
          setter={setIsOpen}
        />
      )}
    </>
  )
}

export default DeleteSchedule