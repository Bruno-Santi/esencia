// src/components/VerifyEmail.js

import React, { useEffect, useState } from "react";
import { Container, Typography, Button, CircularProgress, Box } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log(token);

        const response = await axios.post(`${API_URL}/api/auth/verify-email?token=${token}`);
        if (response.data.message === "El correo se ha validado correctamente.") {
          setSuccess(true);
          setLoading(false);
          setTimeout(() => {
            navigate("/auth/login");
          }, 5000);
        } else {
          setError("Invalid or expired token.");
          setLoading(false);
        }
      } catch (error) {
        setError("Invalid or expired token.");
        setLoading(false);
      }
    };
    verifyEmail();
  }, [token, navigate]);

  const resendVerificationEmail = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/resend-verification-email?token=${token}`);
      alert(response.data.message);
    } catch (error) {
      alert("Error sending verification email.");
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : success ? (
          <>
            <Typography component='h1' variant='h5'>
              Verificación Exitosa
            </Typography>
            <Typography variant='body1' sx={{ mt: 2 }}>
              Tu correo ha sido verificado exitosamente. Serás redirigido al login en breve.
            </Typography>
          </>
        ) : (
          <>
            <Typography component='h1' variant='h5'>
              Token Expirado
            </Typography>
            <Typography variant='body1' sx={{ mt: 2 }}>
              El token ha expirado o es inválido. Por favor, solicita un nuevo correo de verificación.
            </Typography>
            <Button variant='contained' color='primary' sx={{ mt: 3 }} onClick={resendVerificationEmail}>
              Reenviar Correo de Verificación
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
