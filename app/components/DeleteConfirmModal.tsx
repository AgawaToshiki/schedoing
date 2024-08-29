'use client'
import React from 'react'
import Modal from '../components/layouts/Modal'

type Props = {
  isOpen: boolean;
  id: string;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteConfirmModal = ({ isOpen, id, setter }: Props) => {

  const handleDeleteSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response = await fetch('../api/schedule/delete', {
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
      setter(false);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} setter={setter} title="スケジュール削除">
        <div className="mb-6">本当に削除しますか？</div>
        <div className="flex gap-4 justify-end">
          <button onClick={() => setter(false)}>キャンセル</button>
          <form onSubmit={handleDeleteSubmit}>
            <button type="submit">削除する</button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default DeleteConfirmModal