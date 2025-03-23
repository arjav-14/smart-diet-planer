
const express = require("express");
const router = express.Router();

// Import controller functions
const { processChatMessage, getUserChatMessages } = require("../Controllers/chatbotController");

// Import authentication middleware
const authMiddleware = require("../Middleware/authmiddleware");

// Route to process chatbot messages
router.post("/chatbot", authMiddleware, processChatMessage);

// Route to fetch user chat history
router.get("/chatmessages", authMiddleware, getUserChatMessages);

module.exports = router;
