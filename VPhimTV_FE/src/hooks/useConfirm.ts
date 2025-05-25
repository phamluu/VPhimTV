import { useContext } from 'react';

import { ConfirmContext } from '~/context/ConfirmContext';

export const useConfirmBox = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('useConfirmBox must be used within a ConfirmBoxProvider');
  return context;
};
