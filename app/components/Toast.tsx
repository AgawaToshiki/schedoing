import { Transition } from '@headlessui/react';

type ToastProps = {
  open: boolean;
  message: string;
  toastType: 'success' | 'warning' | 'error';
}

const SuccessIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'
      />
    </svg>
  )
}
const WarningIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
      />
    </svg>
  )
}
const ErrorIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z'
      />
    </svg>
  )
}

const Toast = ({ open, message, toastType }: ToastProps) => {

  const toastStyle = () => {
    switch (toastType) {
      case 'success':
        return 'bg-green-200 text-green-700 border-green-700';
      case 'warning':
        return 'bg-yellow-200 text-yellow-700 border-yellow-700';
      case 'error':
        return 'bg-red-200 text-red-700 border-red-700';
    }
  }

  const ToastIcon = () => {
    switch (toastType) {
      case 'success':
        return (
          <SuccessIcon />
        )
      case 'warning':
        return (
          <WarningIcon />
        )
      case 'error':
        return (
          <ErrorIcon />
        )
    }
  }

  return (
    <>
      <Transition show={open}>
        <div className="relative z-[9999] transition duration-200 ease-in-out data-[closed]:opacity-0">
          <div className={`flex items-center gap-2 w-[350px] p-4 absolute top-3 left-1/2 -translate-x-2/4 rounded-lg shadow-md max-md:w-[300px] max-md:text-sm ${toastStyle()}`}>
            <div><ToastIcon /></div>
            <p>{message}</p>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default Toast