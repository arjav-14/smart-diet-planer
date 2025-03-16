
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔹 Link to User model
    userMessage: { type: String, required: true },  
    botResponse: { type: String, required: true }, 
    extractedDiets: [{ type: String }],          
    extractedAllergies: [{ type: String }],
    mealPlan: { type: String },       
    timestamp: { type: Date, default: Date.now }
}, { collection: "messages" });

module.exports = mongoose.model("Message", MessageSchema);

