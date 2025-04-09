// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#0A2342', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F5F5F5' }}>
          .doc
        </Typography>
        <Box>
          <Button component={Link} to="/" sx={{ color: '#F5F5F5', mx: 1 }}>
            Inicio
          </Button>
          <Button component={Link} to="/register" sx={{ color: '#F5F5F5', mx: 1 }}>
            Registrar
          </Button>
          <Button component={Link} to="/users" sx={{ color: '#F5F5F5', mx: 1 }}>
            Usuarios
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
