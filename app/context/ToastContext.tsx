'use client';

import { createContext, useContext, useState, useRef, useCallback } from 'react';
import Toast from '../components/Toast';

type ToastType = 'success' | 'warning' | 'error';

interface ToastContext {
  showToast: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContext>({
  showToast: () => {}
})

export const useToast = () => {
  return useContext(ToastContext);
}

export const ToastProvider = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isShowToast, setShowToast] = useState<boolean>(false);

  const timer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback((message: string, type: ToastType) => {
    if(timer.current){
      setShowToast(false);
      clearTimeout(timer.current);
    }

    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    timer.current = setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {isShowToast && <Toast message={toastMessage} toastType={toastType} />}
      {children}
    </ToastContext.Provider>
  )
}