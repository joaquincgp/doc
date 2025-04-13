import {
  AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleHover = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'background.default' }}>
          .doc
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button component={Link} to="/" sx={{ color: 'background.default', mx: 1 }}>
            Inicio
          </Button>
          <Button component={Link} to="/login" sx={{ color: 'background.default', mx: 1 }}>
            Iniciar Sesión
          </Button>
          <Box
            onMouseEnter={handleHover}
            onMouseLeave={handleClose}
            sx={{ position: 'relative' }}
          >
            <Button sx={{ color: 'background.default', mx: 1 }}>
              Registrarse
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <MenuItem component={Link} to="/register?role=paciente" onClick={handleClose}>Pacientes</MenuItem>
              <MenuItem component={Link} to="/register?role=medico" onClick={handleClose}>Médicos</MenuItem>
            </Menu>
          </Box>
          <Button component={Link} to="/users" sx={{ color: 'background.default', mx: 1 }}>
            Usuarios
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
