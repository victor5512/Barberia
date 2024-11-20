import React, {  useEffect } from "react";
import {
  styled,
  createTheme,
} from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import "@fontsource/rajdhani/500.css";
import fondo1 from "../src/img/fondo_inicial.jpg";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "./Context/ThemeContext.jsx"; // Importar el hook

import { Button, Card, CardContent, CardMedia, Grid } from "@mui/material";

const StyledCardVictor = styled(Card)(({ theme }) => ({
  position: "relative",
  maxWidth: 345,
  margin: "auto",
  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#fafafa",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  borderRadius: "16px",
  "&:hover": {
    transform: "translateY(-10px)", // Eleva la card al hacer hover
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // Sombra de la card
  },
}));



const servicesDataVictor = [
  {
    title: "Servicio 1",
    description: "Corte de Pelo.",
    price: "MX$200",
    imageUrl: "../src/img/imgpage/serv1.jpg",
  },
  {
    title: "Servicio 2",
    description: "Coloración de cabello.",
    price: "MX$500",
    imageUrl: "../src/img/imgpage/coloracion.jpg",
  },
  {
    title: "Servicio 3",
    description: "Arreglo de Barba.",
    price: "MX$150",
    imageUrl: "../src/img/imgpage/cortebarba.jpg",
  },
  {
    title: "Servicio 4",
    description: "Grecas y corte de cejas.",
    price: "MX$50",
    imageUrl: "../src/img/imgpage/greca1.jpg",
  },
  {
    title: "Servicio 5",
    description: "Masajes.",
    price: "MX$500",
    imageUrl: "../src/img/imgpage/imgmasajes/masajecabeza.jpg",
  },
  {
    title: "Servicio 6",
    description: "Mascarilla.",
    price: "MX$100",
    imageUrl: "../src/img/imgpage/imgmascarilla/mascarillamediacara.jpg",
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
        paper: darkMode ? "#1a1a1a" : "#f4f4f4",
      },
      text: {
        primary: darkMode ? "#fff" : "#000", // Color de texto en modo oscuro
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
    if (service.description === "Masajes.") {
      navigate(`/service/Masajes`);
    }
    if(service.description==="Mascarilla."){
      navigate(`/service/Mascarilla`);

    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        Height: "auto",
        width: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "auto",
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

      {/* servicios  */}
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            marginBottom: 4,
            fontFamily: "Rajdhani",
            color: theme.palette.text.primary,
          }}
        >
          Servicios
        </Typography>
        <Grid container spacing={4}>
          {servicesDataVictor.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCardVictor onClick={() => handleCardClick(service)}>
                <CardMedia
                  component="img"
                  height="220"
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
                      color: "#088CA3",
                    }}
                  >
                    {service.price}
                  </Typography>
                </CardContent>



              </StyledCardVictor>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
