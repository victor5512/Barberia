import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Estado inicial: objeto vacío
  const [objectData, setObjectData] = useState({});

  const updateObject = (newObject) => {
    setObjectData(newObject);
  };

  return (
    <AppContext.Provider value={{ objectData, updateObject }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => useContext(ObjectContext);
