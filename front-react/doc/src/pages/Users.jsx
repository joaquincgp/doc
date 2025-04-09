import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, CardActions,
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  IconButton, Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', password: '' });
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:8000/auth/users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Seguro que deseas eliminar este usuario?');
    if (!confirmed) return;
    const res = await fetch(`http://localhost:8000/auth/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSnackbar({ open: true, message: 'Usuario eliminado', severity: 'success' });
      fetchUsers();
    } else {
      setSnackbar({ open: true, message: 'Error eliminando usuario', severity: 'error' });
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setVerifyPassword('');
    setVerifyDialogOpen(true);
  };

  const handleVerifyPassword = async () => {
    const res = await fetch('http://localhost:8000/auth/verify-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: selectedUser.email, password: verifyPassword }),
    });

    if (!res.ok) {
      setSnackbar({ open: true, message: 'Contraseña incorrecta', severity: 'error' });
      return;
    }

    // Si es válida, abrimos modal de edición
    setEditForm({
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      password: '',
    });
    setVerifyDialogOpen(false);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    const res = await fetch(`http://localhost:8000/auth/users/${selectedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      setSnackbar({ open: true, message: 'Usuario actualizado', severity: 'success' });
      setEditDialogOpen(false);
      fetchUsers();
    } else {
      setSnackbar({ open: true, message: 'Error actualizando usuario', severity: 'error' });
    }
  };

  const handleFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#F5F5F5' }}>
        Usuarios Registrados
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ backgroundColor: '#1A1A2E', color: '#FFF' }}>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">{user.email}</Typography>
                <Typography variant="caption" sx={{ color: '#6B8E23' }}>{user.role}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEditClick(user)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(user.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Verificar contraseña */}
      <Dialog open={verifyDialogOpen} onClose={() => setVerifyDialogOpen(false)}>
        <DialogTitle>Verifica tu contraseña</DialogTitle>
        <DialogContent>
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            autoFocus
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVerifyDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleVerifyPassword} variant="contained" color="primary">
            Verificar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Formulario de edición */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="name"
            fullWidth
            value={editForm.name}
            onChange={handleFormChange}
            sx={{ mt: 1 }}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={editForm.email}
            onChange={handleFormChange}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Rol"
            name="role"
            fullWidth
            value={editForm.role}
            onChange={handleFormChange}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Nueva Contraseña (opcional)"
            name="password"
            type="password"
            fullWidth
            value={editForm.password}
            onChange={handleFormChange}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained" color="success">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Users;
