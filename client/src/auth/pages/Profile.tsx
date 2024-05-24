import React, { useState } from "react";
import { Avatar, Button, TextField, Typography, Container, Grid, Paper, FormControlLabel, Switch } from "@mui/material";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { useDocumentTitle } from "../../hooks";

const Profile = () => {
  useDocumentTitle("Perfil | Esencia.app");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
  const [isSubscribed, setIsSubscribed] = useState(false); // Cambiado a false para la suscripción de pagos
  const { user } = useAuthSlice();
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubscriptionChange = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <DashboardLayout>
      <div className='flex flex-col items-center justify-center'>
        <Container maxWidth='sm'>
          <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
            <Grid container spacing={6} justifyContent='center' alignItems='center'>
              <Grid item xs={12}>
                <Typography variant='h4' align='center'>
                  Perfíl
                </Typography>
              </Grid>
              <Grid item xs={12} align='center'>
                {user.method === "Google" ? (
                  <img src={user.avtColor} alt={`${user.name}'s avatar`} className='rounded-full w-12 h-12' />
                ) : (
                  <div className={`${user.avtColor} rounded-full w-12 h-12 flex items-center justify-center`}>
                    <span className='text-tertiary'>{user.name[0]}</span>
                  </div>
                )}
                <input type='file' accept='image/*' onChange={handleAvatarChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField label='Nombre' variant='outlined' fullWidth value={name} onChange={handleNameChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField label='Correo' disabled variant='outlined' fullWidth value={email} onChange={handleEmailChange} />
              </Grid>

              <Grid item xs={12} align='center'>
                <Button variant='contained' color='primary'>
                  Actualizar perfíl
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <Container maxWidth='sm'>
          <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
            <Grid container spacing={6} justifyContent='center' alignItems='center'>
              <Grid item xs={12}>
                <Typography variant='h4' align='center'>
                  Subscripción
                </Typography>
              </Grid>
              <Grid item xs={12} align='center'>
                <div className='text-lg'>
                  Estado: <span className='text-red-500 font-bold'>Inactiva</span>
                </div>
              </Grid>

              <Grid item xs={12} align='center'>
                <Button variant='contained' color='primary'>
                  Pagar con Mercado Pago
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
