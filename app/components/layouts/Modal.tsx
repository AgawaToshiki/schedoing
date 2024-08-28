import React from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

type Props = {
  isShow: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  children: Readonly<React.ReactNode>;
}

const Modal = ({ isShow, setter }: Props) => {
  return (
    <>
      <Dialog open={isShow} onClose={() => setter(false)} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setter(false)}>Cancel</button>
              <button onClick={() => setter(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Modal