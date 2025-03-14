
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const fs = require("fs");
// const path = require("path");
// const multer = require('multer');
// const FoodRecognition = require("../models/FoodRecognition")
// require("dotenv").config();

// // Ensure the "uploads" folder exists
// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer for file storage
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// // Function to analyze food image
// exports.analyzeFoodImage = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     try {
//         // Read the image file and convert it to base64
//         const imageBuffer = fs.readFileSync(req.file.path);
//         const base64Image = imageBuffer.toString('base64');

//         // Clarifai API details
//         const PAT = process.env.CLARIFAI_PAT;
//         const USER_ID = process.env.CLARIFAI_USER_ID || 'clarifai';
//         const APP_ID = process.env.CLARIFAI_APP_ID || 'main';
//         const MODEL_ID = 'food-item-recognition';
//         const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';

//         // Prepare API request to Clarifai
//         const raw = JSON.stringify({
//             "user_app_id": { "user_id": USER_ID, "app_id": APP_ID },
//             "inputs": [{
//                 "data": {
//                     "image": {
//                         "base64": base64Image
//                     }
//                 }
//             }]
//         });

//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': `Key ${PAT}`,
//                 'Content-Type': 'application/json'
//             },
//             body: raw
//         };

//         const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
//         const data = await response.json();

//         // Clean up the uploaded file
//         fs.unlinkSync(req.file.path);

//         if (data.outputs && data.outputs.length > 0) {
//             return res.json({
//                 success: true,
//                 predictions: data.outputs[0].data.concepts
//             });
//         } else {
//             return res.status(400).json({ success: false, message: "No predictions found" });
//         }
//     } catch (error) {
//         // Clean up the uploaded file in case of error
//         if (req.file && req.file.path) {
//             fs.unlinkSync(req.file.path);
//         }
//         console.error("Error in Clarifai API request:", error);
//         return res.status(500).json({ error: "Failed to process the image. " + error.message });
//     }
// };

// // Export multer middleware
// exports.upload = upload;

//MEW
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require("path");
const multer = require('multer');
const FoodRecognition = require("../models/FoodRecognition");
require("dotenv").config();

// Ensure the "uploads" folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Function to analyze food image
exports.analyzeFoodImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        // Read the image file and convert it to base64
        const imageBuffer = fs.readFileSync(req.file.path);
        const base64Image = imageBuffer.toString("base64");

        // Clarifai API details
        const PAT = process.env.CLARIFAI_PAT;
        const USER_ID = process.env.CLARIFAI_USER_ID || "clarifai";
        const APP_ID = process.env.CLARIFAI_APP_ID || "main";
        const MODEL_ID = "food-item-recognition";
        const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";

        // Prepare API request to Clarifai
        const raw = JSON.stringify({
            "user_app_id": { "user_id": USER_ID, "app_id": APP_ID },
            "inputs": [{
                "data": {
                    "image": {
                        "base64": base64Image
                    }
                }
            }]
        });

        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Key ${PAT}`,
                "Content-Type": "application/json",
            },
            body: raw,
        };

        const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
        const data = await response.json();

        // Clean up the uploaded file
        fs.unlinkSync(req.file.path);

        let detectedFoods = [];
        if (data.outputs && data.outputs.length > 0 && data.outputs[0].data.concepts) {
            detectedFoods = data.outputs[0].data.concepts.map(food => ({
                name: food.name,
                confidence: food.value // Confidence score
            }));
        }

        console.log("Detected Food Items:", detectedFoods);

        // Store results in MongoDB
        const newFoodEntry = new FoodRecognition({
            imageName: req.file.filename,
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
        // Clean up the uploaded file in case of error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error("❌ Error in Clarifai API request:", error);
        return res.status(500).json({ error: "Failed to process the image. " + error.message });
    }
};

// Export multer middleware
exports.upload = upload;
