// // const express = require('express');
// // const multer = require('multer');
// // const path = require('path');
// // require('dotenv').config();
// // const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));



// // const router = express.Router();

// // // Multer Storage Setup (Upload to "uploads/" folder)
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, 'uploads/'); // Store files in "uploads" folder
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + path.extname(file.originalname)); // Rename file
// //     }
// // });

// // const upload = multer({ storage: storage });

// // // Clarifai API Details
// // const PAT = process.env.CLARIFAI_PAT;
// // const MODEL_ID = 'food-item-recognition';
// // const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';

// // // 📌 API Route for Image Upload and Recognition
// // router.post('/upload', upload.single('image'), async (req, res) => {
// //     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

// //     const IMAGE_PATH = `http://localhost:5000/uploads/${req.file.filename}`;

// //     // Prepare API request to Clarifai
// //     const raw = JSON.stringify({
// //         "user_app_id": { "user_id": "clarifai", "app_id": "main" },
// //         "inputs": [{ "data": { "image": { "url": IMAGE_PATH } } }]
// //     });

// //     const requestOptions = {
// //         method: 'POST',
// //         headers: { 'Accept': 'application/json', 'Authorization': 'Key ' + PAT, 'Content-Type': 'application/json' },
// //         body: raw
// //     };

// //     try {
// //         const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
// //         const data = await response.json();

// //         if (data.outputs) {
// //             return res.json({ success: true, predictions: data.outputs[0].data.concepts, imageUrl: IMAGE_PATH });
// //         } else {
// //             return res.status(400).json({ success: false, message: "No predictions found" });
// //         }
// //     } catch (error) {
// //         return res.status(500).json({ error: error.message });
// //     }
// // });

// // module.exports = router;
 


// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// require('dotenv').config();
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// const router = express.Router();

// // Ensure the "uploads" folder exists
// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer Storage Setup (Upload to "uploads/" folder)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // Clarifai API Details
// const PAT = process.env.CLARIFAI_PAT;
// const USER_ID = process.env.CLARIFAI_USER_ID || 'clarifai'; // Use your own user_id if available
// const APP_ID = process.env.CLARIFAI_APP_ID || 'main'; // Use your own app_id if available
// const MODEL_ID = 'food-item-recognition';
// const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';

// // 📌 API Route for Image Upload and Recognition
// router.post('/upload', upload.single('image'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Construct image URL dynamically
//     const IMAGE_PATH = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

//     // Prepare API request to Clarifai
//     const raw = JSON.stringify({
//         "user_app_id": { "user_id": USER_ID, "app_id": APP_ID },
//         "inputs": [{ "data": { "image": { "url": IMAGE_PATH } } }]
//     });

//     const requestOptions = {
//         method: 'POST',
//         headers: { 
//             'Accept': 'application/json',
//             'Authorization': `Key ${PAT}`,
//             'Content-Type': 'application/json'
//         },
//         body: raw
//     };

//     try {
//         const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
//         const data = await response.json();

//         if (data.outputs && data.outputs.length > 0) {
//             return res.json({ 
//                 success: true, 
//                 predictions: data.outputs[0].data.concepts, 
//                 imageUrl: IMAGE_PATH 
//             });
//         } else {
//             return res.status(400).json({ success: false, message: "No predictions found" });
//         }
//     } catch (error) {
//         return res.status(500).json({ error: "Failed to process the image. " + error.message });
//     }
// });

// module.exports = router;



const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();


const router = express.Router();

// Ensure the "uploads" folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Setup (Upload to "uploads/" folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Clarifai API Details
const PAT = process.env.CLARIFAI_PAT;
const USER_ID = process.env.CLARIFAI_USER_ID || 'clarifai'; // Use your own user_id if available
const APP_ID = process.env.CLARIFAI_APP_ID || 'main'; // Use your own app_id if available
const MODEL_ID = 'food-item-recognition';
const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';

// 📌 API Route for Image Upload and Recognition
router.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Construct image file path
    const imagePath = req.file.path;

    // Read the image file and convert it to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    // Prepare API request to Clarifai
    const raw = JSON.stringify({
        "user_app_id": { "user_id": USER_ID, "app_id": APP_ID },
        "inputs": [{
            "data": {
                "image": {
                    "base64": base64Image // Send image as base64
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
                imageUrl: imagePath // Return image path
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

