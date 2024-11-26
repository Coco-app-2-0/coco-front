import { UserInfoType } from '@/utils/types';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  userInfo: UserInfoType;
  setUserInfo: (info: UserInfoType) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (userInfo) {
      if (pathname === '/login') {
        router.push('/main');
      }
    }
  }, [userInfo, router]);


  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  }


  return (
    <AuthContext.Provider value={{ userInfo: userInfo!, setUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


