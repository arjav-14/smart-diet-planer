// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema({
//     content: { type: String, required: true },
//     username: { type: String, default: "Anonymous" }, // Ensure username is stored
//     timestamp: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Post", postSchema);
const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  username: { type: String, default: "Anonymous" },
  timestamp: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  username: { type: String, default: "Anonymous" },
  timestamp: { type: Date, default: Date.now },
  replies: [replySchema], // ✅ Array of replies
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
