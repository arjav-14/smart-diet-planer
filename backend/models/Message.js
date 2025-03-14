// const mongoose = require("mongoose");

// const MessageSchema = new mongoose.Schema({
//     userMessage: String,
//     botResponse: String,
//     timestamp: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Message", MessageSchema);

// const mongoose = require("mongoose");

// const Message = new mongoose.Schema({
//     userMessage: { type: String, required: true },  // User's input message
//     botResponse: { type: String, required: true }, // Bot's reply
//     extractedDiets: [{ type: String }],            // List of detected diets
//     extractedAllergies: [{ type: String }],        // List of detected allergies
//     timestamp: { type: Date, default: Date.now }   // Auto-generated timestamp
// });

// module.exports = mongoose.model("ChatMessage", Message);

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    userMessage: { type: String, required: true },  // User's input message
    botResponse: { type: String, required: true }, // Bot's reply
    extractedDiets: [{ type: String }],            // List of detected diets
    extractedAllergies: [{ type: String }],
    mealPlan: { type: String },        // List of detected allergies
    timestamp: { type: Date, default: Date.now }   // Auto-generated timestamp
}, { collection: "messages" });  // Force collection name to avoid auto-pluralization

module.exports = mongoose.model("Message", MessageSchema);
