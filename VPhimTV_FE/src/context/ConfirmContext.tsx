import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react';

import Modal, { ModalProps } from '~/components/Modal';
import { setConfirmFunction } from '~/hooks/utils/confirm';

interface ConfirmProps extends Omit<ModalProps, 'ref'> {
  content: React.ReactNode;
}

interface ConfirmContextType {
  confirm: (options: ConfirmProps) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [options, setOptions] = useState<ConfirmProps | null>(null);
  const [resolveFn, setResolveFn] = useState<(value: boolean) => void>();

  const confirm = (options: ConfirmProps) => {
    return new Promise<boolean>((resolve) => {
      setOptions(options);
      setResolveFn(() => resolve);
    });
  };

  useEffect(() => {
    setConfirmFunction(confirm);
  }, []);

  const handleClose = (result: boolean) => {
    resolveFn?.(result);
    modalRef.current?.close();
    setOptions(null);
  };

  useEffect(() => {
    if (options && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [options]);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {options && (
        <Modal
          ref={modalRef}
          {...options}
          btnOk={{
            ...options.btnOk,
            onClick: async () => {
              try {
                await options.btnOk?.onClick?.();
                handleClose(true);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          btnCancel={{
            ...options.btnCancel,
            onClick: () => {
              options.btnCancel?.onClick?.();
              handleClose(false);
            },
          }}
        >
          {options.content}
        </Modal>
      )}
    </ConfirmContext.Provider>
  );
};

export { ConfirmContext, ConfirmProvider };
export type { ConfirmProps };
