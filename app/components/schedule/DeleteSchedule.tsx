'use client'
import React, { useState } from 'react'
import DeleteConfirmModal from '../../components/layouts/DeleteConfirmModal';
import Button from '../../components/elements/button/Button';

type Props = {
  id: string;
}

const DeleteSchedule = ({ id }: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  const handleDeleteSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response = await fetch('../../api/schedule/delete', {
        cache: 'no-store',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
      })

      const data = await response.json();

      if(!response.ok){
        console.error(data.error, data.status);
      }
      setIsOpen(false);
    }catch(err){
      console.error("DeleteSchedule Error:", err);
    }
  }

  return (
    <>
      <button onClick={(e) => handleOpenModal(e)} className="bg-red-400 hover:bg-red-200">削除</button>
      {isOpen && (
        <DeleteConfirmModal 
          isOpen={isOpen}
          title="スケジュール削除"
          setter={setIsOpen}
        >
          <form onSubmit={handleDeleteSubmit}>
            <Button
              variant="danger"
              size="medium"
              attrs={
                { type: "submit" }
              }
            >
              削除する
            </Button>
          </form>
        </DeleteConfirmModal>
      )}
    </>
  )
}

export default DeleteSchedule