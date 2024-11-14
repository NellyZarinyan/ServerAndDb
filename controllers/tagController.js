const Tag = require("../models/tagModel");

const tagController = {
    createTag: async (req, res) => {
        const { name } = req.body;
        try {
            const tag = await Tag.createTag(name);
            res.status(201).json(tag);
        } catch (error) {
            res.status(500).json({ error: "Failed to create tag" });
        }
    },
    assignTagToUser: async (req, res) => {
        const { userId, tagId } = req.body;
        try {
            const tagAssignment = await Tag.assignTagToUser(userId, tagId);
            res.status(201).json(tagAssignment);
        } catch (error) {
            res.status(500).json({ error: "Failed to assign tag to user" });
        }
    },
    assignTagToPost: async (req, res) => {
        const { postId, tagId } = req.body;
        try {
            const tagAssignment = await Tag.assignTagToPost(postId, tagId);
            res.status(201).json(tagAssignment);
        } catch (error) {
            res.status(500).json({ error: "Failed to assign tag to post" });
        }
    },
    getTagsByPost: async (req, res) => {
        const { postId } = req.params;
        try {
            const tags = await Tag.getTagsByPost(postId);
            res.status(200).json(tags);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve tags for post" });
        }
    },

    // Get tags by user
    getTagsByUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const tags = await Tag.getTagsByUser(userId);
            res.status(200).json(tags);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve tags for user" });
        }
    },
};

module.exports = tagController;
