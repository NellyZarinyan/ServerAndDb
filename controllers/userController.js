const User = require('../models/userModel');

const userController = {
  createUser: async (req, res) => {
    try {
      const { name, ...extraParams } = req.body;
      if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Name is required and cannot be empty." });
      }
      if (Object.keys(extraParams).length > 0) {
        return res.status(400).json({ error: "Only the 'name' field is allowed." });
      }
      const user = await User.create(name);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getUsers: async (req, res) => {
    const users = await User.getAll();
    res.json(users);
  },
  getUserById: async (req, res) => {
    const user = await User.getById(req.params.id);
    res.json(user);
  },
};

module.exports = userController;
