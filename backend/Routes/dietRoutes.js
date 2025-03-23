const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// 🧠 AI Diet Consultation
router.post("/get-suggestion", async (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a diet and nutrition expert." },
                    { role: "user", content: query }
                ]
            },
            { headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" } }
        );

        res.json({ suggestion: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "AI failed to generate suggestion" });
    }
});

module.exports = router;
