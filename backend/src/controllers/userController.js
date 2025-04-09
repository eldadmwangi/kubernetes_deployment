const userModel = require('../models/userModel');

  const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      res.status(200).json(users);
      console.log('users', users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  const getUserById = async (req, res) => {
    try {
      const user = await userModel.getUserById(req.params.id)
      if(!user) {
        return res.status(404).json({ error: 'User not found'})
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error'})
    }
  }

  const createUser = async (req, res) => {
    try {
      const newUser = await userModel.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  }

  const updateUser = async (req, res) => {
    try {
      const updatedUser = await userModel.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error updating user', error: error.message });
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const deletedUser = await userModel.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  }
  
  const getUserByEmail = async (req, res) => {
    try {
      const user = await userModel.getUserByEmail(req.params.email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
  };
