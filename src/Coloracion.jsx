import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Card, CardContent,IconButton,DialogContent, CardMedia, Button, Grid, Dialog } from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut"; // Ícono de barbería
import CloseIcon from '@mui/icons-material/Close';
import Citas from './Cita';

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
    title: "Tinte Natural",
    description: "Realza el color natural de tu cabello.",
    price: "MX$350",
    imageUrl: "/images/tinte-natural.jpg", // Ruta válida
  },
  {
    title: "Mechas",
    description: "Agrega estilo con mechas personalizadas.",
    price: "MX$450",
    imageUrl: "/images/mechas.jpg", // Ruta válida
  },
  {
    title: "Decoloración",
    description: "Transforma tu look con un nuevo tono.",
    price: "MX$600",
    imageUrl: "/images/decoloracion.jpg", // Ruta válida
  },
];

export default function Coloracion() {
  const [open, setOpen] = React.useState(false);

  // Manejar apertura y cierre del popup
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      {/* Título con ícono */}
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
        <ContentCutIcon sx={{ marginRight: 1, fontSize: 40, color: "#0aa6bc" }} />
        Coloración de Pelos
      </Typography>

      {/* Imagen principal */}
      <CardMedia
        component="img"
        height="300"
        image="/images/coloracion-principal.jpg" // Ruta válida
        alt="Coloración de Pelo"
        sx={{ maxWidth: "600px", margin: "auto", borderRadius: "8px" }}
      />

      {/* Precio general */}
      <Typography
        variant="h6"
        sx={{ marginTop: 2, fontFamily: "Rajdhani", color: "#0aa6bc" }}
      >
        Desde MX$350
      </Typography>

      {/* Botón Agendar Cita */}
      <AgendarButton
        variant="contained"
        sx={{ marginTop: 3, padding: "10px 20px" }} onClick={handleOpen}
      >
        Agendar Cita
      </AgendarButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
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
          <Citas onClose={handleClose}/>
        </DialogContent>
      </Dialog>

      {/* Cards de servicios */}
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
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}



