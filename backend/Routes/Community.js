// const express = require("express");
// const router = express.Router();
// const Post = require("../models/PostSchema");

// // Fetch all posts
// router.get("/getposts", async (req, res) => {
//     try {
//         const posts = await Post.find().sort({ timestamp: -1 });
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch posts" });
//     }
// });

//   router.post("/posts", async (req, res) => {
//       try {
//           const { content, user } = req.body;
//           const username = user?.name || "Anonymous"; // Extract username

//           if (!content || !user?.name) {
//               return res.status(400).json({ error: "Content and username are required" });
//           }
  
//           const newPost = new Post({ content, username  });
//           await newPost.save();
//           res.status(201).json(newPost);
//       } catch (error) {
//           res.status(500).json({ error: "Failed to create post" });
//       }
//   });


// module.exports = router;

const express = require("express");
const router = express.Router();
const Post = require("../models/PostSchema");

// Fetch all posts
router.get("/getposts", async (req, res) => {
    try {
        const posts = await Post.find().sort({ timestamp: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

// Create a new post
router.post("/posts", async (req, res) => {
    try {
        const { content, username } = req.body; // Extract username correctly

        if (!content || !username) {
            return res.status(400).json({ error: "Content and username are required" });
        }

        const newPost = new Post({
            content,
            username: username || "Anonymous", // Default to Anonymous if empty
            timestamp: new Date() // Ensure timestamp is stored
        });

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
  
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      const reply = { content, username: username || "Anonymous", timestamp: new Date() };
      post.replies.push(reply);
  
      await post.save();
      res.status(201).json(reply); // ✅ Return the added reply
    } catch (error) {
      console.error("Error adding reply:", error);
      res.status(500).json({ error: "Failed to add reply" });
    }
  });
  
  // ✅ GET: Fetch replies for a specific post
  router.get("/replies/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
  
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      res.json(post.replies); // ✅ Return all replies
    } catch (error) {
      console.error("Error fetching replies:", error);
      res.status(500).json({ error: "Failed to fetch replies" });
    }
  });
  
module.exports = router;
