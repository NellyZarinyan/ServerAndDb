// models/tagModel.js
const db = require('../config/db');

const Tags = {
  createTag: (name) => db.one('INSERT INTO tags (name) VALUES ($1) RETURNING *', [name]),
  assignTagToUser: (userId, tagId) => db.one('INSERT INTO user_tags (user_id, tag_id) VALUES ($1, $2) RETURNING *', [userId, tagId]),
  assignTagToPost: (postId, tagId) => db.one('INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2) RETURNING *', [postId, tagId]),
  getTagsByPost: (postId) => db.any('SELECT tags.name FROM tags JOIN post_tags ON tags.id = post_tags.tag_id WHERE post_tags.post_id = $1', [postId]),
  getTagsByUser: (userId) => db.any('SELECT tags.name FROM tags JOIN user_tags ON tags.id = user_tags.tag_id WHERE user_tags.user_id = $1', [userId]),
};

module.exports = Tags;
