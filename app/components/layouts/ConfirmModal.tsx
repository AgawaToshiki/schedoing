'use client'
import React from 'react'
import Modal from './Modal'
import Button from '../elements/button/Button'

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  children: Readonly<React.ReactNode>;
}

const DeleteConfirmModal = ({ isOpen, title, message, setter, children }: Props) => {

  return (
    <>
      <Modal isOpen={isOpen} setter={setter} title={title}>
        <div className="mb-6">{message}</div>
        <div className="flex gap-4 justify-end items-center">
          <Button 
            onClick={() => setter(false)}
            variant="secondary"
            size="medium"
            attrs={
              { type: "button" }
            }
          >
            キャンセル
          </Button>
          {children}
        </div>
      </Modal>
    </>
  )
}

export default DeleteConfirmModal