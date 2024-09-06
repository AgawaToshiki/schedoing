import React from 'react'
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import Button from '../../components/elements/button/Button';
import Icon from '../../components/elements/icon/Icon';

type Props = {
  isOpen: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: Readonly<React.ReactNode>;
}

const Modal = ({ isOpen, setter, title, children }: Props) => {

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        onClose={() => setter(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel
            className="max-w-lg w-full bg-blue-100 rounded-md shadow-md"
          >
            <div className="flex items-center justify-between bg-blue-400 p-6 rounded-t-md">
              <DialogTitle className="font-bold">{title}</DialogTitle>
              <Button
                onClick={() => setter(false)}
                variant="secondary"
                size="small"
                form="circle"
                attrs={
                  { type: "button" }
                }
              >
                <Icon icon="close" size={20} className="text-gray-500" />
              </Button>
            </div>
            <div className="flex flex-col p-6">
              {children}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Modal