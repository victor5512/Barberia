import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
    user: null,
    phone: null,
    service: null,
    email: null,
    theme: 'light',
    // Puedes añadir más propiedades según tus necesidades
};

// Reductor para manejar las acciones de actualización del estado
function appReducer(state, action) {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.payload.user,
                phone: action.payload.phone,
                email: action.payload.email,
                // Puedes añadir más campos si es necesario
            };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                phone: null,
                email: null,
                // Restablecer otros campos si es necesario
            };
        default:
            return state;
    }
}




// Crear el contexto
const AppContext = createContext();

// Crear el proveedor
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

// Hook personalizado para usar el contexto en otros componentes
export function useAppContext() {
    return useContext(AppContext);
}
