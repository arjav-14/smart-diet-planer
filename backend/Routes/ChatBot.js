const express = require("express");
const router = express.Router();
const { processChatMessage } = require("../Controllers/chatbotController");

router.post("/chatbot", processChatMessage);

module.exports = router;
