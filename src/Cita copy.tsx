import React, { useState, StrictMode } from 'react';
import { Calendar, Clock, Scissors, User, Menu, Sun, Moon, X, PieChart, Users } from 'lucide-react';
import { Box, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// @ts-ignore
import { createItemId } from "./servicios/firebase";

interface Appointment {
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
}

const cita = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#fdd835',
      },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const initialValues: Appointment = {
    name: '',
    phone: '',
    date: '',
    time: '',
    service: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Debe ser un número').required('El teléfono es obligatorio'),
    date: Yup.string().required('La fecha es obligatoria'),
    time: Yup.string().required('La hora es obligatoria'),
    service: Yup.string().required('Seleccione un servicio'),
  });

  const handleAppointmentSubmit = async (values: Appointment) => {
    setAppointments([...appointments, values]);
    await createItemId("citas", values);
  };

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', p: 3 }}>
          <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
            <Box sx={{ width: 250 }}>
              <IconButton onClick={toggleSidebar} sx={{ mt: 2, ml: 2 }}>
                <X />
              </IconButton>
              <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>Menu</Typography>
              <List>
                {[
                  { icon: <PieChart size={20} />, text: 'Citas' },
                  { icon: <Scissors size={20} />, text: 'Servicios' },
                  { icon: <Calendar size={20} />, text: 'Reservaciones' },
                  { icon: <Users size={20} />, text: 'Clientes' },
                ].map((item, index) => (
                  <ListItem button key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <IconButton onClick={toggleSidebar}>
              <Menu />
            </IconButton>
            <IconButton onClick={toggleDarkMode}>
              {darkMode ? <Sun /> : <Moon />}
            </IconButton>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleAppointmentSubmit(values);
                resetForm();
              }}
            >
              {({ values, handleChange }) => (
                <Form style={{ width: '100%', maxWidth: 400 }}>
                  <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom>Reservar una cita</Typography>
                    <Field
                      as={TextField}
                      name="name"
                      label="Nombre"
                      fullWidth
                      margin="normal"
                      onChange={handleChange}
                      value={values.name}
                      helperText={<ErrorMessage name="name" />}
                      error={Boolean(<ErrorMessage name="name" />)}
                    />
                    <Field
                      as={TextField}
                      name="phone"
                      label="Teléfono"
                      fullWidth
                      margin="normal"
                      onChange={handleChange}
                      value={values.phone}
                      helperText={<ErrorMessage name="phone" />}
                      error={Boolean(<ErrorMessage name="phone" />)}
                    />
                    <Field
                      as={TextField}
                      name="date"
                      type="date"
                      label="Fecha"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                      value={values.date}
                      helperText={<ErrorMessage name="date" />}
                      error={Boolean(<ErrorMessage name="date" />)}
                    />
                    <Field
                      as={TextField}
                      name="time"
                      type="time"
                      label="Hora"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                      value={values.time}
                      helperText={<ErrorMessage name="time" />}
                      error={Boolean(<ErrorMessage name="time" />)}
                    />
                    <FormControl fullWidth margin="normal">
                      <Field
                        as={Select}
                        name="service"
                        displayEmpty
                        onChange={handleChange}
                        value={values.service}
                      >
                        <MenuItem value="">
                          <em>Seleccione el servicio</em>
                        </MenuItem>
                        <MenuItem value="Corte-de-cabello">Corte de cabello</MenuItem>
                        <MenuItem value="Afeitado">Afeitado</MenuItem>
                        <MenuItem value="Corte-y-afeitado">Corte de cabello y afeitado</MenuItem>
                      </Field>
                      <Typography color="error" variant="body2" sx={{ mt: 1 }}>
  <ErrorMessage name="name" component="span" />
</Typography>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                      Reservar cita
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

            <Box mt={4} width="100%" maxWidth={400}>
              <Typography variant="h5" gutterBottom>Reservaciones</Typography>
              {appointments.map((apt, index) => (
                <Box key={index} sx={{ bgcolor: 'background.paper', p: 2, mb: 2, borderRadius: 1, boxShadow: 1 }}>
                  <Typography><strong>{apt.name} registró una cita</strong></Typography>
                  <Typography>El {apt.date} a la hora {apt.time}</Typography>
                  <Typography>Servicio: {apt.service}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </StrictMode>
  );
}

export default cita;
