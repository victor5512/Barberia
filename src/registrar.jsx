import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import fondosesion from "./img/fondosesion.jpg";
import acceso from "./img/acceso.png";
import { createItemEdgar } from "./servicios/firebase";
import { registerUserEdgar } from "./servicios/login"


export default function Registrar() {
  const defaultTheme = createTheme();

  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  });
  const [open, setOpen] = React.useState(false); // Estado para el Snackbar
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbarMessage("Por favor, ingresa un correo electrónico válido.");
      setSnackbarSeverity("error");
      setOpen(true);
      return;
    }
  
    // Validación de contraseña
    if (formData.password.length <= 6) {
      setSnackbarMessage("La contraseña debe tener más de 6 caracteres.");
      setSnackbarSeverity("error");
      setOpen(true);
      return;
    }
  
    try {
      await registerUserEdgar(formData.email, formData.password);
      setSnackbarMessage("Usuario registrado exitosamente");
      setSnackbarSeverity("success");
      setFormData({ email: "", password: "" });
      setOpen(true);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setSnackbarMessage("Hubo un error al registrar el usuario");
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          md={7}
          sx={{
            backgroundImage: `url(${fondosesion})`,
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }} src={acceso} />
            <Typography component="h1" variant="h5">
              Registrar
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  '& .MuiInputLabel-root': { color: 'black' },
                  '& .MuiInputBase-input': { color: 'black' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'black' },
                    '&:hover fieldset': { borderColor: 'black' },
                    '&.Mui-focused fieldset': { borderColor: 'black' },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                sx={{
                  '& .MuiInputLabel-root': { color: 'black' },
                  '& .MuiInputBase-input': { color: 'black' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'black' },
                    '&:hover fieldset': { borderColor: 'black' },
                    '&.Mui-focused fieldset': { borderColor: 'black' },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "black" }}
              >
                Registrarse
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/Login" variant="body2" sx={{ color: 'black' }}>
                    {"Iniciar sesión"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
