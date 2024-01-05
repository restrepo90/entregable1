import { useState, useEffect } from 'react';
import './app.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    status: '',
  });

  useEffect(() => {
    // Lógica para obtener la lista de usuarios, actualiza setUsers con la respuesta
    fetch('http://localhost:5000/api/v1/users')
      .then((response) => response.json())
      .then((data) => console.log(data))
      
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    // Manejar cambios en los campos de entrada del nuevo usuario
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (userId) => {
    // Al hacer clic en "Editar", establece el ID del usuario que se está editando
    setEditUserId(userId);

    // Busca los datos del usuario que se está editando y establece el estado
    const userToEdit = users.find((user) => user.id === userId);
    setNewUserData({
      name: userToEdit.name,
      email: userToEdit.email,
      status: userToEdit.status,
    });
  };

  const handleCancelEdit = () => {
    // Al hacer clic en "Cancelar", restablece el estado de edición
    setEditUserId(null);
    setNewUserData({
      name: '',
      email: '',
      status: '',
    });
  };

  const handleSaveEdit = (userId) => {
    // Lógica para guardar la edición del usuario con el ID userId
    fetch(`http://localhost:5000/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Actualizar la lista de usuarios después de la edición
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, ...newUserData } : user
          )
        );
        // Restablecer el estado de edición
        setEditUserId(null);
        setNewUserData({
          name: '',
          email: '',
          status: '',
        });
      })
      .catch((error) => console.error('Error updating user:', error));
  };

  const handleDelete = (userId) => {
    // Lógica para borrar el usuario con el ID userId
    fetch(`http://localhost:5000/api/v1/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Actualizar la lista de usuarios después de la eliminación
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handleCreateUser = () => {
    // Lógica para crear un nuevo usuario
    fetch('http://localhost:5000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
      .then((response) => {
        // Verificar si la solicitud fue exitosa (código de estado 2xx)
        if (!response.ok) {
          throw new Error(`Error al crear un nuevo usuario: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Actualizar la lista de usuarios después de la creación
        setUsers((prevUsers) => [...prevUsers, data]);
        // Restablecer el estado del nuevo usuario
        setNewUserData({
          name: '',
          email: '',
          status: '',
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editUserId === user.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={newUserData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Correo electrónico"
                  value={newUserData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="status"
                  placeholder="Estado"
                  value={newUserData.status}
                  onChange={handleInputChange}
                />
                <button onClick={() => handleSaveEdit(user.id)}>Guardar</button>
                <button onClick={handleCancelEdit}>Cancelar</button>
              </div>
            ) : (
              <div>
                {user.name} - {user.email} - {user.status}
                <button onClick={() => handleEdit(user.id)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Borrar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Nuevo Usuario</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newUserData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Correo electrónico"
          value={newUserData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Estado"
          value={newUserData.status}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateUser}>Crear Usuario</button>
      </div>
    </div>
  );
};

export default UserList;
