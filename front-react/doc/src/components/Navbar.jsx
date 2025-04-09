import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'background.default' }}>
          .doc
        </Typography>
        <Box>
          <Button component={Link} to="/" sx={{ color: 'background.default', mx: 1 }}>
            Inicio
          </Button>
          <Button component={Link} to="/register" sx={{ color: 'background.default', mx: 1 }}>
            Registrar
          </Button>
          <Button component={Link} to="/users" sx={{ color: 'background.default', mx: 1 }}>
            Usuarios
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
