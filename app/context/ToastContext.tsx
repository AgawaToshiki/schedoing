'use client';

import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import Toast from '../components/Toast';

type ToastType = 'success' | 'warning' | 'error';

interface ToastContext {
  showToast: (message: string, type: ToastType) => void;
  closeToast: () => void;
}

export const ToastContext = createContext<ToastContext>({
  showToast: () => {},
  closeToast: () => {}
})

export const useToast = () => {
  return useContext(ToastContext);
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isShowToast, setShowToast] = useState<boolean>(false);

  const timer = useRef<ReturnType<typeof setTimeout>>();

  // useCallbackで関数を最適化
  const showToast = useCallback((message: string, type: ToastType) => {
    // 既存のタイマーをキャンセル
    if(timer.current){
      setShowToast(false);
      clearTimeout(timer.current);
    }

    // 状態を即座に更新
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // 新しいタイマーをセット
    timer.current = setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }, []);

  const closeToast = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setShowToast(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {isShowToast && <Toast message={toastMessage} toastType={toastType} />}
      {children}
    </ToastContext.Provider>
  )
}