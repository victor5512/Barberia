import React from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Formik, Form, Field } from 'formik';
import { Button, Box, Grid, Card, Stack, TextField, MenuItem, CircularProgress, Typography } from '@mui/material';
import { createItemId } from "./servicios/firebase";

export default function RegistroCita({onClose}) {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '',
    servicio: '',
  };

  const CitaSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    telefono: Yup.string()
      .matches(/^\d+$/, 'Debe contener solo números')
      .min(10, 'El número debe tener al menos 10 dígitos')
      .required('El teléfono es obligatorio'),
    fecha: Yup.string().required('La fecha es obligatoria'),
    hora: Yup.string().required('La hora es obligatoria'),
    servicio: Yup.string().required('El servicio es obligatorio'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await createItemId("citas", values);
      enqueueSnackbar('Cita registrada exitosamente.', { variant: 'success' });
      resetForm();
      onClose();
    } catch (error) {
      enqueueSnackbar('Error al registrar la cita: ' + error.message, { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CitaSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form autoComplete="off" noValidate>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 6 }}>
                  <Typography variant="h5" gutterBottom>
                    Registro de Cita
                  </Typography>
                  <Stack spacing={3}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Nombre"
                      name="nombre"
                      error={Boolean(touched.nombre && errors.nombre)}
                      helperText={touched.nombre && errors.nombre}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Teléfono"
                      name="telefono"
                      error={Boolean(touched.telefono && errors.telefono)}
                      helperText={touched.telefono && errors.telefono}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Fecha"
                      name="fecha"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      error={Boolean(touched.fecha && errors.fecha)}
                      helperText={touched.fecha && errors.fecha}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Hora"
                      name="hora"
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      error={Boolean(touched.hora && errors.hora)}
                      helperText={touched.hora && errors.hora}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Servicio"
                      name="servicio"
                      select
                      error={Boolean(touched.servicio && errors.servicio)}
                      helperText={touched.servicio && errors.servicio}
                    >
                      <MenuItem value="Corte de cabello">Corte de cabello</MenuItem>
                      <MenuItem value="Afeitado">Afeitado</MenuItem>
                      <MenuItem value="Tinte">Tinte</MenuItem>
                      <MenuItem value="Limpieza facial">Limpieza facial</MenuItem>
                    </Field>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                      >
                        Registrar Cita
                      </Button>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
