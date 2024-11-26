import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Para la navegación
import { loginAcc } from "./servicios/firebase";
import { loginUserEdgar, signInWithGoogleEdgar } from "./servicios/login"; // El método para autenticación
import fondosesion from "./img/fondosesion.jpg";
import acceso from "./img/acceso.png";
import GoogleIcon from '@mui/icons-material/Google';
import { useAppContext } from './Context/appContext';

export default function Login() {
  const defaultTheme = createTheme()
  const { objectData, updateObject } = useAppContext();;
  const navigate = useNavigate();

  // Estados para los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para manejar el Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  // Manejar el cierre del Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const us = await signInWithGoogleEdgar();
      if (us.emailVerified) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Inicio de sesión exitoso");
        setOpenSnackbar(true);
        updateObject(us);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Usuario o contraseña incorrectos");
        setOpenSnackbar(true);
      }
    } catch (error) {
      alert("Permite las ventanas emergentes para completar el inicio de sesión con Google.");
    }
  };

  // Método para manejar el inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUserEdgar(email, password);
      if (user) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Inicio de sesión exitoso");
        setOpenSnackbar(true);
        updateObject(user);
        // Redirigir a la página principal
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Usuario o contraseña incorrectos");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Hubo un error al intentar iniciar sesión");
      setOpenSnackbar(true);
    }
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
              Inicio de Sesión
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Iniciar Sesión
              </Button>
              <Button
  fullWidth
  variant="outlined"
  onClick={handleGoogleSignIn}
  startIcon={<GoogleIcon />}
  sx={{
    mt: 1,
    mb: 2,
    borderColor: "black",
    color: "black",
    "&:hover": {
      backgroundColor: "#f1f1f1",
      borderColor: "black",
    },
  }}
>
  Iniciar Sesión con Google
</Button>
              <Grid container>
                <Grid item>
                  <Link href="./registro" variant="body2" sx={{ color: 'black' }}>
                    {"No tengo una cuenta? Crear una"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
