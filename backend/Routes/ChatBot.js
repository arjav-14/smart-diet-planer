
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
// const express = require("express");
// const router = express.Router();

// // Import controller functions
// const { 
//     processChatMessage, 
//     getUserChatMessages, 
//     getAllMealPlans 
// } = require("../Controllers/chatbotController");

// // Import authentication middleware
// const authMiddleware = require("../Middleware/authmiddleware");

// /**
//  * Chatbot Routes
//  * Base path: /api
//  */

// // Process new chat messages
// router.post("/chatbot", authMiddleware, processChatMessage);

// // Get user's chat history with preferences
// router.get("/chat/history", authMiddleware, getUserChatMessages);

// // Get all meal plans for the user
// router.get("/chat/mealplans", authMiddleware, getAllMealPlans);

// // For WebSocket connection (if implemented)
// router.get("/chat/connect", authMiddleware, (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "WebSocket connection authorized"
//     });
// });

// // Clear chat history (optional)
// router.delete("/chat/history", authMiddleware, async (req, res) => {
//     try {
//         await ChatMessage.deleteMany({ userId: req.user.id });
//         res.status(200).json({
//             success: true,
//             message: "Chat history cleared successfully"
//         });
//     } catch (error) {
//         console.error("❌ Error clearing chat history:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;