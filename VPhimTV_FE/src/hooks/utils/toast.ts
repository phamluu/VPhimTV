import { ToastProps } from '~/context/ToastContext';

let showToastFunction: ((toast: Omit<ToastProps, 'id'>, callback?: () => Promise<void>) => void) | null = null;

export const setToastFunction = (fn: typeof showToastFunction) => {
  showToastFunction = fn;
};

export const toast = (toast: Omit<ToastProps, 'id'>, callback?: () => Promise<void>) => {
  if (showToastFunction) {
    showToastFunction(toast, callback);
  } else {
    console.warn('showToast is not initialized yet.');
  }
};
