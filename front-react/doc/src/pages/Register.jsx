// src/pages/Register.jsx
import {
  Box, Paper, Typography, TextField, MenuItem, Button, Container
} from '@mui/material';
import { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'paciente',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const registerUser = async () => {
    const res = await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) alert('Usuario registrado');
    else alert('Error');
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        py: 8,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 5 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
            Registro de Usuario
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Contraseña"
            fullWidth
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Rol"
            select
            fullWidth
            name="role"
            value={form.role}
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            <MenuItem value="paciente">Paciente</MenuItem>
            <MenuItem value="medico">Médico</MenuItem>
          </TextField>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              py: 1.2,
              fontSize: '1rem',
            }}
            onClick={registerUser}
          >
            Registrar
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
