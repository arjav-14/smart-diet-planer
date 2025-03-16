const fs = require("fs");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const multer = require("multer");
const FoodRecognition = require("../models/FoodRecognition"); // Importing model
const { CLARIFAI_PAT, CALORIENINJA_API_KEY } = process.env; // Use CalorieNinja API Key

// ✅ Configure Multer (Use Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.upload = upload;

// ✅ Function to get calorie info using CalorieNinja API
const getCalorieInfo = async (foodName) => {
    try {
        const formattedFoodName = foodName.trim().toLowerCase();
        console.log(`🔍 Fetching calorie info for: ${formattedFoodName}`);

        const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(formattedFoodName)}`, {
            method: "GET",
            headers: { "X-Api-Key": CALORIENINJA_API_KEY }, // ✅ Use CalorieNinja API Key
        });

        console.log(`📡 CalorieNinja API Response Status: ${response.status}`);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`❌ CalorieNinja API Error: HTTP ${response.status} - ${errorBody}`);
            return 0; // Return 0 if API fails
        }

        const data = await response.json();
        console.log(`✅ API Response for ${formattedFoodName}:`, JSON.stringify(data, null, 2));

        if (!data.items || data.items.length === 0) {
            console.warn(`⚠️ No nutrition data found for: ${formattedFoodName}`);
            return 0;
        }

        const calories = data.items[0]?.calories ?? 0;
        console.log(`🔥 Calories for ${formattedFoodName}: ${calories}`);
        return calories;
    } catch (error) {
        console.error(`❌ Error fetching calorie info for ${foodName}:`, error);
        return 0;
    }
};

// ✅ Function to analyze food image
exports.analyzeFoodImage = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const base64Image = req.file.buffer.toString("base64");

        const raw = JSON.stringify({
            user_app_id: { user_id: "clarifai", app_id: "main" },
            inputs: [{ data: { image: { base64: base64Image } } }],
        });

        const response = await fetch(
            "https://api.clarifai.com/v2/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Key ${CLARIFAI_PAT}`,
                    "Content-Type": "application/json",
                },
                body: raw,
            }
        );

        const data = await response.json();

        if (!data.outputs || !data.outputs[0] || !data.outputs[0].data.concepts) {
            return res.status(400).json({ error: "No food items detected." });
        }

        const detectedFoods = await Promise.all(
            data.outputs[0].data.concepts.map(async (food) => ({
                name: food.name,
                confidence: food.value,
                calories: await getCalorieInfo(food.name) || 0, // ✅ Ensure numeric value
            }))
        );

        console.log("✅ Detected Food Items:", detectedFoods);

        const newFoodEntry = new FoodRecognition({
            imageName: req.file.originalname,
            recognizedFoods: detectedFoods,
            date: new Date(),
        });

        await newFoodEntry.save();
        console.log("✅ Saved to database:", newFoodEntry);

        return res.json({
            success: true,
            predictions: detectedFoods,
            message: "✅ Food items stored successfully!",
        });
    } catch (error) {
        console.error("❌ Error in Clarifai API request:", error);
        return res.status(500).json({ error: `Failed to process the image. ${error.message}` });
    }
};
