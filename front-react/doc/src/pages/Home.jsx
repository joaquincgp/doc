import { Box, Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Home = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #505f54, #a2a68a)',
        padding: 4,
      }}
    >
      <Paper elevation={6} sx={{ p: 6, borderRadius: 4, maxWidth: 700, width: '100%', textAlign: 'center' }}>
        <MedicalServicesIcon sx={{ fontSize: 60, color: '#1a2b3c' }} />
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Bienvenido al Sistema Médico Doc
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Administra usuarios, médicos y pacientes con eficiencia y estilo.
        </Typography>
        <Button variant="contained" component={Link} to="/register" sx={{ mr: 2, backgroundColor: '#b66d4e' }}>
          Registrar Usuario
        </Button>
        <Button variant="outlined" component={Link} to="/users">
          Ver Usuarios
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
