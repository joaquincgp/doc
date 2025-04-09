// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Sistema Médico</h1>
        <div>
          <Link to="/" className="text-white mx-2 hover:text-gray-200">Inicio</Link>
          <Link to="/register" className="text-white mx-2 hover:text-gray-200">Registrar Usuario</Link>
          <Link to="/users" className="text-white mx-2 hover:text-gray-200">Usuarios</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
