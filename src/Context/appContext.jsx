import React, { createContext, useState, useContext, useEffect  } from "react";

// Crear el contexto
const AppContext = createContext();
const LOCAL_STORAGE_KEY = "objectData";

export const AppProvider = ({ children }) => {
  // Estado inicial: objeto vacío
  const [objectData, setObjectData] = useState(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  });

  const updateObject = (newObject) => {
    setObjectData(newObject);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newObject));
  };

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      setObjectData(JSON.parse(storedData));
    }
  }, []);

  return (
    <AppContext.Provider value={{ objectData, updateObject }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => useContext(AppContext);
