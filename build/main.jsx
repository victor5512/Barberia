import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter sirve para navegacion de paginas
import BarberShop from "../src/BarberShop.jsx";
import App from "../src/App.jsx";
import { AppProvider } from '../src/Context/appContext.jsx';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
