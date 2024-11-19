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
import DarkModeIcon from "@mui/icons-material/Brightness2"; // Icono de luna
import LightModeIcon from "@mui/icons-material/WbSunny"; // Icono de sol;
import { useDarkMode } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Drawer,
  Switch,
} from "@mui/material";
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

export default function NavBar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const { darkMode, toggleDarkMode } = useDarkMode();

  // Tema dinámico según el estado de `darkMode`
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#000000" : "#088CA3",
      },
      background: {
        default: darkMode
          ? "#000000"
          : `linear-gradient(
            -45deg, /* Inclinación de -45 grados */
            #088CA3 10%, /* Azul */
            #FFFFFF 5%, /* Blanco (2% de espacio) */
            #E60023 20%, /* Rojo */
            #FFFFFF 5%, /* Blanco */
            #088CA3 29%, /* Azul */
            #FFFFFF 5%, /* Blanco */
            #E60023 38%, /* Rojo */
            #FFFFFF 5%, /* Blanco */
            #088CA3 48%, /* Azul */
            #FFFFFF 5%, /* Blanco */
            #E60023 58%, /* Rojo */
            #FFFFFF 5%, /* Blanco */
            #088CA3 68%, /* Azul */
            #FFFFFF 5%, /* Blanco */
            #E60023 78%, /* Rojo */
            #FFFFFF 3%, /* Blanco */
            #088CA3 88%, /* Azul */
            #FFFFFF 3%, /* Blanco */
            #E60023 99%, /* Rojo */
            #FFFFFF 100% /* Blanco final */
          )`,
      },
      text: {
        primary: darkMode ? "#FFFFFF" : "#000000", // Íconos y texto dinámico
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

  const goToHouse = () => {
    navigate("/");
  };

  // Función para abrir y cerrar el Drawer
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Renderiza los iconos en el Drawer
  const renderDrawer = () => (
    <Box
      sx={{
        width: 140,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <StyledIconButton
        size="large"
        aria-label="calendario"
        color="inherit"
        onClick={goToCalendar}
      >
        <CalendarTodayIcon sx={{ fontSize: 40 }} />
      </StyledIconButton>

      <StyledIconButton
        size="large"
        aria-label="account of current users"
        color="inherit"
        onClick={toggleDarkMode}
      >
        {darkMode ? <LightModeIcon sx={{fontSize:40}} /> : <DarkModeIcon  sx={{fontSize:40}}/>}
      </StyledIconButton>

      <StyledIconButton
        size="large"
        aria-label="house"
        color="inherit"
        onClick={goToHouse}
      >
        <HomeIcon sx={{ fontSize: 40 }} />
      </StyledIconButton>

      <StyledIconButton
        size="large"
        aria-label="account of current user"
        color="inherit"
        onClick={goToLogin}
      >
        <AccountCircle sx={{ fontSize: 40 }} />
      </StyledIconButton>
    </Box>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        bgcolor: "Background.default",
        color: "text.primary",
      }}
    >
      <AppBar
        position="fixed"
        sx={{  background: theme.palette.background.default,boxShadow:"none", }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)} // Abre el Drawer
            sx={{ color: theme.palette.text.primary,mr: 2, display: { xs: "block", md: "none" } }} // Solo en pantallas pequeñas
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: theme.palette.text.primary, display: { xs: "none", sm: "block" } }}
          >
            BarberShop
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: theme.palette.text.primary }}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: theme.palette.text.primary }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <StyledIconButton
              size="large"
              aria-label="calendario"
              color="inherit"
              sx={{ color: theme.palette.text.primary }}
              onClick={goToCalendar}
            >
              <CalendarTodayIcon />
            </StyledIconButton>

            {/* Botón para alternar entre modo claro y oscuro */}
            <IconButton
              size="large"
              aria-label="toggle dark mode"
              color="inherit"
              onClick={toggleDarkMode}
              sx={{ color: theme.palette.text.primary }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>


            <StyledIconButton
        size="large"
        aria-label="house"
        color="inherit"
        onClick={goToHouse}
        sx={{ color: theme.palette.text.primary }}
      >
        <HomeIcon  />
      </StyledIconButton>

            <StyledIconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
              onClick={goToLogin}
              sx={{ color: theme.palette.text.primary }}
            >
              <AccountCircle />
            </StyledIconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Renderiza el Drawer con los iconos este es el bueno*/}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderDrawer()}
      </Drawer>
    </Box>
  );
}
