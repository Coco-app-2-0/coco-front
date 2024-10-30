import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userInfo: string | null;
  setUserInfo: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<string | null>(localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
