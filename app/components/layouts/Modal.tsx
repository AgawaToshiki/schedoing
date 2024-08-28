import React from 'react'
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'

type Props = {
  isShow: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: Readonly<React.ReactNode>;
}

const Modal = ({ isShow, setter, title, children }: Props) => {
  return (
    <>
      <Dialog 
        open={isShow} 
        onClose={() => setter(false)} 
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="max-w-lg bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between bg-blue-400 p-6 rounded-t-md">
              <DialogTitle className="font-bold">{title}</DialogTitle>
              <button onClick={() => setter(false)}>×</button>
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