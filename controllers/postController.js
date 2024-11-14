const Post = require('../models/postModel');

const postController = {
  createPost: async (req, res) => {
    const { userId, content } = req.body;
    const post = await Post.create(userId, content);
    res.json(post);
  },
  getPosts: async (req, res) => {
    const posts = await Post.getAll();
    res.json(posts);
  },
  getPostsByUserId: async (req, res) => {
    const posts = await Post.getByUserId(req.params.userId);
    res.json(posts);
  },
};

module.exports = postController;
