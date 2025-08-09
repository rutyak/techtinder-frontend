import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [requestCount, setRequestCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ requestCount, setRequestCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalVariable = () => useContext(GlobalContext);
