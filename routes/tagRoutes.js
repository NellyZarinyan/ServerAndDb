const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.post('/', tagController.createTag);
router.post('/user', tagController.assignTagToUser);
router.post('/post', tagController.assignTagToPost);
router.get('/post/:postId', tagController.getTagsByPost);
router.get('/user/:userId', tagController.getTagsByUser);

module.exports = router;