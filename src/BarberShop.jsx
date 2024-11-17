import React, { useState, useEffect } from "react";
import {
  styled,
  alpha,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import "@fontsource/rajdhani/500.css";
import AccountCircle from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import fondo1 from "../src/img/fondo_inicial.jpg";
import DarkModeIcon from "@mui/icons-material/Brightness2"; // Icono de luna
import LightModeIcon from "@mui/icons-material/WbSunny"; // Icono de sol;
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"; // Importar Outlet para las rutas hijas
// import {fondomader} from "./CalendarPage";
import { useDarkMode } from "./Context/ThemeContext.jsx";  // Importar el hook

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Drawer,
  Switch,
} from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transición
  "&:hover": {
    transform: "translateY(-35px)", // Eleva la card
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // Aumenta la sombra
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transición
  "&:hover": {
    transform: "translateY(-5px)", // Eleva el icono
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Aumenta la sombra
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const servicesData = [
  {
    title: "Servicio 1",
    description: "Corte de Pelo.",
    price: "MX$0",
    imageUrl: "../src/img/imgpage/serv1.jpg",
  },
  {
    title: "Servicio 2",
    description: "Coloración de cabello.",
    price: "MX$0",
    imageUrl: "../src/img/imgpage/coloracion.jpg",
  },
  {
    title: "Servicio 3",
    description: "Arreglo de Barba.",
    price: "MX$0",
    imageUrl: "../src/img/imgpage/cortebarba.jpg",
  },
  {
    title: "Servicio 4",
    description: "Grecas y corte de cejas.",
    price: "MX$0",
    imageUrl: "../src/img/imgpage/greca1.jpg",
  },
  {
    title: "Servicio 5",
    description: "Tratamiento Capilar Personalizado.",
    price: "MX$0",
    imageUrl: "../src/img/imgpage/capilarpersonalizado.png",
  },
  {
    title: "Servicio 6",
    description: "Mascarilla.",
    price: "MX$0",
    imageUrl: "../src/img/imgpage/mascarilla.jpg",
  },
];

export default function BarberShop() {
  const { darkMode, toggleDarkMode } = useDarkMode(); 
  const navigate = useNavigate();

  // Tema dinámico según el estado de `darkMode`
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#1a1a1a" : "#935116",
      },
      background: {
        default: darkMode ? "#121212" : "#ffffff",
      },
    },
  });

  // Guardar la configuración en `localStorage` cuando cambia `darkMode`
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  
  const goToCalendar = () => {
    navigate("/Calendar"); // Navega a la página del calendario
  };
  // const goToStore = () => {
  //   navigate("/Store"); //navega a pagina de tienda
  // };
  const goToLogin = () => {
    navigate("/Login");
  };
  //boton para navegar en servicios
  const handleCardClick = (service) => {
    if (service.description === "Corte de Pelo.") {
      navigate(`/service/corte-de-pelo`); // Navega a la página de Corte de Pelo
    }
    if (service.description === "Coloración de cabello.") {
      navigate(`/service/coloracion`);
    }
    if (service.description === "Arreglo de Barba.") {
      navigate(`/service/arreglo-de-barba`);
    }
    if (service.description === "Grecas y corte de cejas.") {
      navigate(`/service/grecas-y-corte-de-cejas`);
    }
    if (service.description === "Tratamiento Capilar Personalizado.") {
      navigate(`/service/tratamiento-capilar`);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
     
        }}
      >
        <div
          style={{
            width: "100%",
            height: "auto",
            position: "relative",
          }}
        >
          <img
            src={fondo1}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "350px",
              boxShadow: "5px 5px 3px rgba(0, 0, 0, 0.8)",
              objectFit: "cover", // Esto asegura que la imagen cubra el área sin distorsionarse
            }}
          />
        </div>
        {/* fin de la imagen */}

        <Box sx={{ padding: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ marginBottom: 4, fontFamily: "Rajdhani" }}
          >
            Servicios
          </Typography>
          <Grid container spacing={4}>
            {servicesData.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard onClick={() => handleCardClick(service)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={service.imageUrl}
                    alt={service.title}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: 2,
                        fontFamily: "Rajdhani-600",
                        color: "#935116",
                      }}
                    >
                      {service.price}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
