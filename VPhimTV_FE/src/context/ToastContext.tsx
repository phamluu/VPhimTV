import { AnimatePresence, motion } from 'motion/react';
import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

import { setToastFunction } from '~/hooks/utils/toast';
import { UniqueId } from '~/utils/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
  isLoading?: boolean;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'id'>, callback?: () => Promise<void>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const classMap = {
  success: { toast: 'alert-success', icon: 'fa-circle-check' },
  error: { toast: 'alert-error', icon: 'fa-circle-xmark' },
  warning: { toast: 'alert-warning', icon: 'fa-triangle-exclamation' },
  info: { toast: 'alert-info', icon: 'fa-circle-info' },
};

const titleMap = {
  success: 'Thành công',
  error: 'Thất bại',
  warning: 'Cảnh báo',
  info: 'Thông tin',
};

const Toast: React.FC<ToastProps & { onClose: () => void }> = ({ type, message, title, isLoading, onClose }) => {
  const { toast: toastClass, icon: iconClass } = classMap[type];

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: ['105%', '-5%', '2%', '0%'], opacity: 1 }}
      exit={{ x: ['0%', '-5%', '105%'], opacity: 0 }}
      transition={{ x: { type: 'tween', duration: 0.4 }, opacity: { duration: 0.5 } }}
      className={`alert ${toastClass} alert-soft p-3 flex gap-2 items-start max-w-[60vw]`}
    >
      <div className="flex-none">
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <i className={`text-xl fa-sharp fa-regular ${iconClass}`}></i>
        )}
      </div>
      <div className="flex-1">
        <strong>{title || titleMap[type]}</strong>
        <p className="text-wrap">{message}</p>
      </div>
      <i className="fa-light fa-xmark cursor-pointer" onClick={onClose}></i>
    </motion.div>
  );
};

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = useCallback((toast: Omit<ToastProps, 'id'>, callback?: () => Promise<void>) => {
    const id = UniqueId();
    setToasts((prev) => [...prev, { ...toast, id, isLoading: !!callback }]);

    if (callback) {
      callback()
        .then(() => {
          setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isLoading: false, type: 'success' } : t)));
          setTimeout(() => removeToast(id), toast.duration || 3000);
        })
        .catch(() => {
          setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isLoading: false, type: 'error' } : t)));
          setTimeout(() => removeToast(id), toast.duration || 3000);
        });
    } else {
      setTimeout(() => removeToast(id), toast.duration || 3000);
    }
  }, []);

  // Toast function global
  useEffect(() => {
    setToastFunction(showToast);
  }, [showToast]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div id="toast-container" className="toast toast-top z-10">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
export type { ToastProps };
