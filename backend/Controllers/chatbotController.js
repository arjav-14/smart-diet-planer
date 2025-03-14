// // Use dynamic import to load node-fetch
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// require("dotenv").config();

// // Extract dietary preferences from the message
// const extractDietaryInfo = (message) => {
//     const diets = ["vegan", "vegetarian", "keto", "paleo", "gluten-free", "dairy-free"];
//     const allergies = ["peanut", "shellfish", "lactose", "soy", "wheat"];

//     const extractedDiets = diets.filter(diet => message.toLowerCase().includes(diet));
//     const extractedAllergies = allergies.filter(allergy => message.toLowerCase().includes(allergy));

//     return { extractedDiets, extractedAllergies };
// };

// // Process chatbot request
// exports.processChatMessage = async (req, res) => {
//     try {
//         const { message } = req.body;
//         if (!message) return res.status(400).json({ error: "Message is required" });

//         // Extract dietary preferences from message
//         const { extractedDiets, extractedAllergies } = extractDietaryInfo(message);

//         const response = await fetch("https://api.cohere.ai/v1/generate", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 model: "command",
//                 prompt: message,
//                 max_tokens: 100
//             }),
//         });

//         const data = await response.json();
//         const botResponse = data.generations?.[0]?.text.trim() || "🤖 No response from AI.";

//         res.json({
//             botMessage: botResponse,
//             dietaryInfo: { extractedDiets, extractedAllergies }
//         });
//     } catch (error) {
//         console.error("❌ Cohere API Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };


// Use dynamic import to load node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

require("dotenv").config();
const ChatMessage = require("../models/Message"); // Import the ChatMessage model

// Function to extract dietary preferences from the message
const extractDietaryInfo = (message) => {
    const diets = ["vegan", "vegetarian", "keto", "paleo", "gluten-free", "dairy-free" ,"diet"];
    const allergies = ["peanut", "shellfish", "lactose", "soy", "wheat"];

    const extractedDiets = diets.filter(diet => message.toLowerCase().includes(diet));
    const extractedAllergies = allergies.filter(allergy => message.toLowerCase().includes(allergy));

    return { extractedDiets, extractedAllergies };
};

// Process chatbot request and store conversation in MongoDB
exports.processChatMessage = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        // Extract dietary preferences from message
        const { extractedDiets, extractedAllergies } = extractDietaryInfo(message);

        // Call Cohere API for AI-generated response
        const response = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "command",
                prompt: message,
                max_tokens: 100
            }),
        });

        const data = await response.json();
        const botResponse = data.generations?.[0]?.text.trim() || "🤖 No response from AI.";

        // Save conversation to MongoDB
        const chatEntry = new ChatMessage({
            userMessage: message,
            botResponse: botResponse,
            extractedDiets: extractedDiets,
            extractedAllergies: extractedAllergies,
            mealPlan: extractedDiets.length > 0 ? botResponse : null
        });

        await chatEntry.save();
        console.log("✅ Chat message saved:", chatEntry);

        // Send response to frontend
        res.json({
            botMessage: botResponse,
            dietaryInfo: { extractedDiets, extractedAllergies }
        });
    } catch (error) {
        console.error("❌ Cohere API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getAllMealPlans = async (req, res) => {
    try {
        const mealPlans = await ChatMessage.find({ mealPlan: { $ne: null } }); // Fetch only messages that have meal plans
        res.json(mealPlans);
    } catch (error) {
        console.error("❌ Error fetching meal plans:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Delete a specific meal plan
