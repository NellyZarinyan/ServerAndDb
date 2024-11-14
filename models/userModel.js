// models/userModel.js
const db = require('../config/db');

const User = {
  create: (name) => db.one('INSERT INTO users(name) VALUES($1) RETURNING *', [name]),
  getAll: () => db.any('SELECT * FROM users'),
  getById: (id) => db.one('SELECT * FROM users WHERE id = $1', [id]),
};

module.exports = User;
