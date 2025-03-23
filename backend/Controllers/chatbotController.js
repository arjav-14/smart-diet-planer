const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require("dotenv").config();
const ChatMessage = require("../models/Message");
const authenticateUser = require("../Middleware/authmiddleware");

// Function to extract dietary preferences and allergies from a message
const extractDietaryInfo = (message) => {
  const diets = ["vegan", "vegetarian", "keto", "paleo", "gluten-free", "dairy-free", "diet", "plan"];
  const allergies = ["peanut", "shellfish", "lactose", "soy", "wheat"];

  const extractedDiets = diets.filter(diet => message.toLowerCase().includes(diet));
  const extractedAllergies = allergies.filter(allergy => message.toLowerCase().includes(allergy));

  return { extractedDiets, extractedAllergies };
};

// Utility function to call Cohere API for AI response
const getAIResponse = async (message) => {
  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: message,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Cohere API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.generations?.[0]?.text.trim() || "🤖 AI service is unavailable.";
  } catch (error) {
    console.error("❌ Error in AI response:", error.message);
    return "🤖 AI service error.";
  }
};

// Controller to process user message
exports.processChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required." });

    // Ensure req.user exists (from auth middleware)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    // Extract dietary preferences and allergies
    const { extractedDiets, extractedAllergies } = extractDietaryInfo(message);

    // Get AI-generated response
    const botResponse = await getAIResponse(message);

    // Create and save chat entry with dietary info
    const chatEntry = new ChatMessage({
      userId: req.user.id,
      userMessage: message,
      botResponse,
      extractedDiets,
      extractedAllergies,
      mealPlan: extractedDiets.length > 0 ? botResponse : null, // Store meal plan if diet is mentioned
    });

    await chatEntry.save();

    res.status(201).json({
      success: true,
      botMessage: botResponse,
      dietaryInfo: { extractedDiets, extractedAllergies },
      message: "Chat processed successfully.",
    });
  } catch (error) {
    console.error("❌ Error processing chat:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to fetch user's meal plans
exports.getAllMealPlans = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    const mealPlans = await ChatMessage.find({
      userId: req.user.id,
      mealPlan: { $ne: null },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      mealPlans,
    });
  } catch (error) {
    console.error("❌ Error fetching meal plans:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to fetch user's chat history
exports.getUserChatMessages = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    const messages = await ChatMessage.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to latest 50 messages

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("❌ Error fetching chat:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
