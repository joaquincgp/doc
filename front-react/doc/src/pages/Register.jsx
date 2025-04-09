// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';

const Register = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'paciente',
    id: null
  });

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/auth/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    } else {
      console.error("Failed to fetch users");
    }
  };

  const registerUser = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const url = form.id
      ? `http://localhost:8000/auth/users/${form.id}`
      : "http://localhost:8000/auth/register";

    const method = form.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error del servidor:", errorResponse);
        throw new Error("Failed to register user");
      }

      setForm({ name: "", email: "", password: "", role: "paciente", id: null });
      fetchUsers();
    } catch (error) {
      console.error("Error registrando o editando usuario:", error);
    }
  };

  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:8000/auth/users/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchUsers();
    } else {
      console.error("Failed to delete user");
    }
  };

  const editUser = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      id: user.id,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Registrar Usuario</h2>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Contraseña"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="paciente">Paciente</option>
          <option value="medico">Médico</option>
        </select>
      </div>
      <button className="btn btn-primary mb-4" onClick={registerUser}>
        Registrar
      </button>

      <h3>Usuarios Registrados</h3>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{user.name}</strong> - {user.email} ({user.role})
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => editUser(user)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteUser(user.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Register;
