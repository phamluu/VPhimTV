import { useQuery } from '@tanstack/react-query';
import isEqual from 'lodash/isEqual';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { checkUser } from '~/service/auth/authApi';
import { decryptObj } from '~/utils/utils';

type AuthContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(() => {
    const encrypted = localStorage.getItem('auth');
    if (!encrypted) return null;

    try {
      return decryptObj(encrypted);
    } catch (err) {
      console.log('An error when decrypted', err);
      return null;
    }
  });

  const { data, isLoading } = useQuery({
    queryKey: ['checkLogin'],
    queryFn: () => checkUser(),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!user,
  });

  useEffect(() => {
    if (!isLoading && user) {
      if (!data || !isEqual(user, data.data)) {
        console.log('User is not logged in, resetting user state');
        setUser(null);
        localStorage.removeItem('auth');
      }
    }
  }, [data, isLoading, user]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
