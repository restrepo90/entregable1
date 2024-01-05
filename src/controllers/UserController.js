const bcrypt = require('bcrypt');

const User = require('../models/userModel');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password, role, status } = req.body;
  
      // Verificar si el usuario ya existe por su correo electrónico
      const existingUser = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if (existingUser) {
        // Usuario con el mismo correo electrónico ya existe
        return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
      }
  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el nuevo usuario con la contraseña encriptada
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        status,
      });
  
      // Enviar la respuesta con el nuevo usuario creado
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error al crear un nuevo usuario:', error);
  
      // Enviar un mensaje de error más detallado
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

     
      if (!name && !email) {
        return res.status(400).json({ error: 'Se requieren datos para actualizar el usuario' });
      }

      
      if (name) user.name = name;
      if (email) user.email = email;

      
      await user.save();

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  },

  disableUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      user.status = 'disabled';

      await user.save();

      res.json({ message: 'Cuenta deshabilitada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al deshabilitar la cuenta del usuario' });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      await user.destroy();

      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
},

};

module.exports = UserController;
