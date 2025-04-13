import React, { useState } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button, Alert
} from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(form).toString(),
    });

    if (!res.ok) {
      setError('Credenciales incorrectas');
    } else {
      const data = await res.json();
      alert(`Bienvenido. Token: ${data.access_token}`);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 5 }}>
          <Typography variant="h5" mb={3} color="primary">
            Iniciar Sesión
          </Typography>
          <TextField
            label="Correo electrónico"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Iniciar sesión
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
