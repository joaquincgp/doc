// src/pages/Users.jsx
import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:8000/auth/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-5">Usuarios Registrados</h2>
      <ul className="list-none">
        {users.map((user) => (
          <li key={user.id} className="mb-3 p-3 border rounded-md">
            <strong>{user.name}</strong> - {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
