import { UserInfoType } from '@/utils/types';
import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userInfo: UserInfoType;
  setUserInfo: (info: UserInfoType) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  return (
    <AuthContext.Provider value={{ userInfo: userInfo!, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};


