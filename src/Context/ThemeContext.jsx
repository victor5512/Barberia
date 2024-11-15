// ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  // const savedMode = localStorage.getItem("darkMode");
  // return savedMode ? JSON.parse(savedMode) : false;
  // const toggleDarkMode = () => {
  //   setDarkMode((prevMode) => {
  //     const newMode = !prevMode;
  //     localStorage.setItem("darkMode", JSON.stringify(newMode));
  //     console.log("Modo oscuro actualizado en localStorage:", newMode);
  //     return newMode;
  //   });
  // };

  useEffect(() => {
    const applyDarkMode = () => {
      const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
      setDarkMode(storedDarkMode || false);
      if (storedDarkMode){
        document.body.classList.add('dark-mode');
      }else {
        document.body.classList.remove('dark-mode');
      }
      console.log('Modo oscuro activo:', storedDarkMode);  
    };

    
    applyDarkMode();
    const handleStorageChange = (event) => {
      if (event.key === 'darkMode') {
        applyDarkMode();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));  

    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    console.log('Modo oscuro activado:', newDarkMode); 
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
