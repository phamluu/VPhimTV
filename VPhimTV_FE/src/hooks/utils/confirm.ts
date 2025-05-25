import { ConfirmProps } from '~/context/ConfirmContext';

let showConfirmFunction: ((options: ConfirmProps) => Promise<boolean>) | null = null;
let currentConfirmRef: HTMLDialogElement;

export const setConfirmFunction = (fn: typeof showConfirmFunction) => {
  showConfirmFunction = fn;
};
export const setConfirmRef = (ref: HTMLDialogElement) => {
  currentConfirmRef = ref;
};

export const getConfirmRef = () => currentConfirmRef;
export const confirm = (options: ConfirmProps) => {
  if (!showConfirmFunction) {
    throw new Error('showConfirmBox is not initialized yet.');
  }
  return showConfirmFunction(options);
};
