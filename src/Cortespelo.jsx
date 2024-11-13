import * as React from "react";
import { useTheme  } from './Context/ThemeContext.jsx'; // Asegúrate de que esta ruta sea correcta
import { styled } from "@mui/material/styles";
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";
import { useAppContext } from './Context/appContext';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
}));

const AgendarButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0aa6bc",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#088ca3",
  },
}));

const servicesData = [
  {
    title: "Servicio 1",
    description: "Descripción del servicio 1",
    price: "MX$0",
    imageUrl: "path_to_image_1",
  },
  {
    title: "Servicio 2",
    description: "Descripción del servicio 2",
    price: "MX$0",
    imageUrl: "path_to_image_2",
  },
  {
    title: "Servicio 3",
    description: "Descripción del servicio 3",
    price: "MX$0",
    imageUrl: "path_to_image_3",
  },
];

export default function CorteDePelo() {
  const { darkMode } = useTheme();
  const { state, dispatch } = useAppContext();;

  console.log("aaaaaaaaaaaaaaaaaaaa",state)
  return (
    <Box sx={{ padding: 4, textAlign: "center", backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh' }}>
      {/* Título */}
      <Typography variant="h4" component="h1" sx={{ fontFamily: "Rajdhani", marginBottom: 2 }}>
        Corte de Pelo
      </Typography>

      {/* Imagen */}
      <CardMedia
        component="img"
        height="300"
        image="path_to_main_image" // Cambia por la ruta de tu imagen
        alt="Corte de Pelo"
        sx={{ maxWidth: "600px", margin: "auto" }}
      />

      {/* Precio */}
      <Typography variant="h6" sx={{ marginTop: 2, fontFamily: "Rajdhani", color: "#0aa6bc" }}>
        MX$0
      </Typography>

      {/* Botón Agendar Cita */}
      <AgendarButton variant="contained" sx={{ marginTop: 3, padding: "10px 20px" }}>
        Agendar Cita
      </AgendarButton>

      {/* Cards debajo */}
      <Box sx={{ marginTop: 6 }}>
        <Grid container spacing={4}>
          {servicesData.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
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
                  <Typography variant="h6" sx={{ marginTop: 2, fontFamily: "Rajdhani", color: "#0aa6bc" }}>
                    {service.price}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
