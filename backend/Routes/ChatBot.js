
const express = require("express");
const router = express.Router();
const { processChatMessage , getUserChatMessages} = require("../Controllers/chatbotController");
const authMiddleware = require("../Middleware/authmiddleware"); 


router.post("/chatbot", authMiddleware, processChatMessage);
router.get("/chatmessages", authMiddleware, getUserChatMessages);
module.exports = router;
