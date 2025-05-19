import React, { createContext, useState, useCallback } from 'react';
export interface AppContextType {
  refreshTips: () => void;
  lastUpdated: Date | null;
  searchRecipes: boolean;
  setSearchRecipes: (value: boolean) => void; 
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
const [searchRecipes, setSearchRecipes] = useState<boolean>(false);
  const refreshTips = useCallback(() => {
    setLastUpdated(new Date());
  }, []);

  return (
    <AppContext.Provider value={{ refreshTips, lastUpdated,searchRecipes,setSearchRecipes }}>
      {children}
    </AppContext.Provider>
  );
};
