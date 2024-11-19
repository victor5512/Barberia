import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter sirve para navegacion de paginas
import BarberShop from "./BarberShop.jsx";
import App from "./App.jsx";
import { SnackbarProvider  } from 'notistack';
import { AppProvider } from './Context/appContext.jsx';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider
            maxSnack={3} // Número máximo de notificaciones visibles simultáneamente
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >

    <AppProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </AppProvider>
        </SnackbarProvider>
  </React.StrictMode>
);
