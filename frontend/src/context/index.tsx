"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [loggedName, setLoggedName] = useState<string | undefined>(undefined);
  let [loggedEmail, setLoggedEmail] = useState<string | undefined>(undefined);
  let [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        loggedEmail,
        loggedName,
        isAuthenticated,
        setLoggedName,
        setLoggedEmail,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
