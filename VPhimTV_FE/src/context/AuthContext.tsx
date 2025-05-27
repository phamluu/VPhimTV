import { useQuery } from '@tanstack/react-query';
import CryptoJS from 'crypto-js';
import isEqual from 'lodash/isEqual';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { fetchUser } from '~/service/users/authApi';

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
      const bytes = CryptoJS.AES.decrypt(encrypted, import.meta.env.VITE_APP_NAME);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (err) {
      console.error('An error when decrypted', err);
      return null;
    }
  });

  const { data } = useQuery({
    queryKey: ['userAuth'],
    queryFn: () => fetchUser(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (user && data) {
      if (!isEqual(user, data)) {
        console.log('User data has changed, updating localStorage');
        localStorage.removeItem('auth');
        setUser(null);
        return;
      }

      try {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(user), import.meta.env.VITE_APP_NAME).toString();
        localStorage.setItem('auth', encrypted);
      } catch (err) {
        console.error('An error when encrypted', err);
      }
    } else {
      localStorage.removeItem('auth');
    }
  }, [data, user]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
