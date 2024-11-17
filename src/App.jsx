import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalendarPage from "./CalendarPage.jsx";
import BarberShop from "./BarberShop.jsx";
import Store from "./store.jsx";
import Sesion from "./login.jsx";
import Registro from "./registrar.jsx";
import Cortespelo from "./Cortespelo.jsx";
import Coloracion from "./Coloracion.jsx";
import Arreglobarba from "./Arreglobarba.jsx";
import GrecasCejas from "./GrecasCejas.jsx";
import Tratamiento from "./Tratamiento.jsx";
import Navbar from './components/Navbar.jsx';
// @ts-ignore
import Citas from "./Cita.tsx"

import { createTheme } from "@mui/material/styles";
import { DarkModeProvider } from './Context/ThemeContext'; 

// import Mascarilla from "./Mascarilla.jsx";

export default function App() {

  return (
    <DarkModeProvider>
      <Navbar/>

      <div style={{ marginTop: '40px' }}>

      <Routes>
        <Route path="/" element={<BarberShop />} /> {/* Ruta principal */}
        <Route path="/Calendar" element={<CalendarPage />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/Login" element={<Sesion />} />
        <Route path="/registro" element={<Registro />} />
        {/* rutas servicios */}
        <Route path="/service/corte-de-pelo" element={<Cortespelo />} />{" "}
        {/* Ruta de servicio 1 Corte de Pelo */}
        <Route path="/service/coloracion" element={<Coloracion />} />
      <Route path="/service/arreglo-de-barba" element={<Arreglobarba />} />
      <Route path="/service/grecas-y-corte-de-cejas" element={<GrecasCejas />} />
      <Route path="/service/tratamiento-capilar" element={<Tratamiento />} />
      <Route path="/citas" element={<Citas />} />
     {/* <Route path="/service/mascarilla" element={<Mascarilla />} /> */}
      </Routes>
      </div>
    </DarkModeProvider>
  );
}
