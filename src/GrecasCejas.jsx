import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import Citas from './Cita';
import { useAppContext } from './Context/appContext';
import CloseIcon from '@mui/icons-material/Close';
import { useDarkMode } from "./Context/ThemeContext";
import { useNavigate } from "react-router-dom"; // Para la navegación
import ContentCutIcon from "@mui/icons-material/ContentCut"; // Ícono de barbería

const CardWrapper = styled("div")(() => ({
  position: "relative",
  "&:hover .hover-button": {
    opacity: 1, // Muestra el botón
  },
  "&:hover .card-hover": {
    transform: "translateY(-10px)", // Eleva la carta
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // Agrega sombra
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#fafafa",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  borderRadius: "16px",

  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-10px)", // Eleva la card al hacer hover
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // Sombra de la card
  },
  "&:hover .hover-button": {
    opacity: 1, // Muestra el botón
    transform: "translate(-50%, 0)", // Lo posiciona correctamente
  },
}));

// Estilo para el botón
const ButtonStyled = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "300px",
  left: "50%", // Centrado horizontalmente
  transform: "translateX(-50%)", // Ajuste para el centrado
  width: "80%", // Ancho relativo para adaptarse a diferentes pantallas
  maxWidth: "340px", // Límite máximo de ancho
  height: "60px", // Altura más compacta
  backgroundColor: "rgba(0, 0, 255, 0.4)", // Fondo semi-transparente azul
  color: "#fff",
  opacity: 0, // Oculto por defecto
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.3s ease", // Transición para suavizar la aparición
  zIndex: 2, // Sobre el resto de elementos
  cursor: "pointer",

  // Ajustes responsivos para mantener consistencia
  [theme.breakpoints.down("xs")]: {
    top: "93%", // Ajuste en pantallas muy pequeñas
    height: "50px",
    fontSize: "0.8rem", // Texto más pequeño
    width: "90%", // Más ancho en pantallas pequeñas
  },
  [theme.breakpoints.between("sm", "md")]: {
    top: "91%", // Más abajo en pantallas medianas
    height: "55px",
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("md")]: {
    top: "85%",
    height: "60px",
    fontSize: "1rem",
  },
  [theme.breakpoints.up("lg")]: {
    top: "82%",
    height: "70px",
    fontSize: "1.2rem",
  },
}));

const servicesDataVictor = [
  {
    title: "Ceja doble línea",
    description: "Ceja doble línea",
    price: "MX$60",
    imageUrl: "../src/img/imgpage/imggrecas/cejadoblelinea.jpg",
  },
  {
    title: "Ceja de una sola línea",
    description: "Para estar a la moda",
    price: "MX$70",
    imageUrl: "../src/img/imgpage/imggrecas/cejalinea.jpg",
  },
  {
    title: "Ceja en forma de X",
    description: "Uno de las grandes estilos fantasticos",
    price: "MX$90",
    imageUrl: "../src/img/imgpage/imggrecas/cejax.jpg",
  },
];

export default function GrecasCejas() {
  const { objectData, updateObject } = useAppContext();
  const { darkMode } = useDarkMode() || {}; // Usar el contexto de dark mode
  const navigate = useNavigate(); // Para navegar

  // Función para navegar a la página de agendar cita
  const goToCalendar = () => {
    navigate("/Calendar"); // Navegar a la página del calendario
  };
  const [open, setOpen] = React.useState(false);

  // Manejar apertura y cierre del popup
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
        width: "100%",
      }}
    >
      {/* Título */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontFamily: "Rajdhani",
          marginBottom: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <ContentCutIcon
          sx={{ marginRight: 1, fontSize: 40, color: "#0aa6bc" }}
        />
        Grecas Cejas
      </Typography>

      {/* Imagen */}
      <CardMedia
        component="img"
        height="300"
        image="../src/img/imgpage/greca1.jpg" // Cambia por la ruta de tu imagen
        alt="Grecas cejas"
        sx={{ maxWidth: "600px", margin: "auto" }}
      />

      {/* Precio */}
      <Typography
        variant="h6"
        sx={{ marginTop: 2, fontFamily: "Rajdhani", color: "#0aa6bc" }}
      >
        MX$50
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
        Grecas.
      </Typography>
      {/* Botón Agendar Cita */}
      <Button
        variant="contained"
        sx={{ marginTop: 3, padding: "10px 20px" }}
        onClick={handleOpen}
      >
        Agendar Cita
      </Button>

      {/* Popup con el formulario */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        <DialogContent>
          <Citas onClose={handleClose} serv={'Grecas'}/>
        </DialogContent>
      </Dialog>

      {/* Cards debajo */}
      <Box sx={{ marginTop: 6 }}>
        <Grid container spacing={4}>
          {servicesDataVictor.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardWrapper>
                <StyledCard className="card-hover">
                  <CardMedia
                    component="img"
                    height="260"
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
                        fontFamily: "Rajdhani",
                        color: "#0aa6bc",
                      }}
                    >
                      {service.price}
                    </Typography>
                  </CardContent>
                </StyledCard>
                <ButtonStyled
                  className="hover-button"
                  sx={{
                    backgroundColor: "rgba(0, 180, 225, 0.7)", // Azul con transparencia
                    color: "#fff", // Asegura que el texto sea visible
                    "&:hover": { backgroundColor: "rgba(0, 123, 255, 0.9)" },
                  }}
                  onClick={goToCalendar}
                >
                  Agendar Cita
                </ButtonStyled>
              </CardWrapper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
