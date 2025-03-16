
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("../models/PostSchema");


router.get("/getposts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


router.post("/posts", async (req, res) => {
  try {
    const { content, username } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required" });

    const newPost = new Post({ content, username: username || "Anonymous", timestamp: new Date() });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});


router.post("/replies/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, username } = req.body;
    if (!content) return res.status(400).json({ error: "Reply content is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const reply = { content, username: username || "Anonymous", timestamp: new Date() };
    post.replies.push(reply);
    await post.save();
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: "Failed to add reply" });
  }
});

module.exports = router;


