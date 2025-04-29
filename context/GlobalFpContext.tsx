import React, { createContext, useContext, useState, ReactNode } from 'react';

type GlobalFpContextType = {
  hasRequested: boolean;
  setHasRequested: (value: boolean) => void;
  isCourager: boolean;
  setIsCourager: (value: boolean) => void;
};

const GlobalFpContext = createContext<GlobalFpContextType | undefined>(undefined);

export const GlobalFpProvider = ({ children }: { children: ReactNode }) => {
  const [hasRequested, setHasRequested] = useState(false);
  const [isCourager, setIsCourager] = useState(false);

  return (
    <GlobalFpContext.Provider value={{ hasRequested, setHasRequested, isCourager, setIsCourager }}>
      {children}
    </GlobalFpContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalFpContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
