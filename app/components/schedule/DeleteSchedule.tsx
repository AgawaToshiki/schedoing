'use client'
import React, { useState } from 'react'
import ConfirmModal from '../../components/layouts/ConfirmModal';
import Button from '../../components/elements/button/Button';
import Icon from '../../components/elements/icon/Icon';

type Props = {
  id: string;
  paramId: string;
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const DeleteSchedule = ({ id, paramId }: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  const handleDeleteSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response = await fetch(`${base_url}/api/schedule/delete`, {
        cache: 'no-store',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, paramId })
      })

      const data = await response.json();

      if(!response.ok){
        console.error(response.status, data.error);
        alert(`${response.status}:${data.error}`);
      }
      setIsOpen(false);
    }catch(error){
      console.error("fetch Error:", error);
      alert("スケジュール削除に失敗しました。ネットワーク接続を確認してください。");
    }
  }

  return (
    <>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenModal(e)}
        variant="danger"
        size="small"
        form="circle"
        attrs={
          { type: "button" }
        }
        className="w-[30px] h-[30px]"
      >
        <Icon icon="delete" color="#fff" size={20}/>
      </Button>
      {isOpen && (
        <ConfirmModal 
          isOpen={isOpen}
          title="スケジュール削除"
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

export default DeleteSchedule