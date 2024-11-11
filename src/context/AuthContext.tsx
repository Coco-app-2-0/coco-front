import { UserInfoType } from '@/utils/types';
import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userInfo: UserInfoType;
  setUserInfo: (info: UserInfoType) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);


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


