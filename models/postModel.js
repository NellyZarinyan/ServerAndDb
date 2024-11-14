// models/postModel.js
const db = require('../config/db');

const Post = {
  create: (userId, content) => db.one('INSERT INTO posts(user_id, content) VALUES($1, $2) RETURNING *', [userId, content]),
  getAll: () => db.any('SELECT * FROM posts'),
  getByUserId: (userId) => db.any('SELECT * FROM posts WHERE user_id = $1', [userId]),
};

module.exports = Post;
