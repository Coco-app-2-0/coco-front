import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userInfo: string | null;
  setUserInfo: (info: any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<string | null>('');
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
