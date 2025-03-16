const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();


const router = express.Router();


const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


const PAT = process.env.CLARIFAI_PAT;
const USER_ID = process.env.CLARIFAI_USER_ID || 'clarifai'; 
const APP_ID = process.env.CLARIFAI_APP_ID || 'main';
const MODEL_ID = 'food-item-recognition';
const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';


router.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

   
    const imagePath = req.file.path;

    
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    
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
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Key ${PAT}`,
            'Content-Type': 'application/json'
        },
        body: raw
    };

    try {
        const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
        const data = await response.json();

        if (data.outputs && data.outputs.length > 0) {
            return res.json({
                success: true,
                predictions: data.outputs[0].data.concepts,
                imageUrl: imagePath 
            });
        } else {
            return res.status(400).json({ success: false, message: "No predictions found" });
        }
    } catch (error) {
        console.error("Error in Clarifai API request:", error);
        return res.status(500).json({ error: "Failed to process the image. " + error.message });
    }
});

module.exports = router;

