'use client'
import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from '../../components/layouts/ConfirmModal';
import Button from '../../components/elements/Button';
import Icon from '../../components/elements/Icon';
import Ellipses from '../../components/elements/Ellipses';
import { BASE_URL } from '../../constants/paths';

type Props = {
  scheduleId: string;
  userId: string;
}


const DeleteSchedule = ({ scheduleId, userId }: Props) => {

  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  const handleDeleteSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isProcessing) {
      return
    }
    setIsProcessing(true);
    try{
      const response = await fetch(`${BASE_URL}/api/schedules/${scheduleId}`, {
        cache: 'no-store',
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      })

      const data = await response.json();

      if(!response.ok){
        console.error(response.status, data.error);
        showToast(`${data.error}`, 'error');
        setIsProcessing(false);
        return
      }
      setIsOpen(false);
      showToast('スケジュールを削除しました', 'success');
      setIsProcessing(false);
    }catch(error){
      console.error("fetch Error:", error);
      showToast('スケジュール削除に失敗しました、ネットワーク接続を確認してください', 'error');
      setIsProcessing(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenModal(e)}
        variant="danger"
        size="small"
        form="circle"
        position="center"
        className="w-[30px] min-w-[30px] h-[30px] max-sm:w-[24px] max-sm:min-w-[24px] max-sm:h-[24px]"
      >
        <Icon icon="delete" color="#fff" size={16}/>
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
              type="submit"
              variant="danger"
              size="medium"
              form="square"
              position="center"
            >
              {isProcessing ? (
						    <Ellipses>削除中</Ellipses>
              ) : (
                "削除する"
              )}
            </Button>
          </form>
        </ConfirmModal>
      )}
    </>
  )
}

export default DeleteSchedule