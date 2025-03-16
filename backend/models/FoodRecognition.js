
const mongoose = require("mongoose");

const FoodRecognitionSchema = new mongoose.Schema({
    imageName: { type: String, required: true },
    recognizedFoods: [
        {
            name: { type: String, required: true },
            confidence: { type: Number, required: true },
            calories: { type: Number, default: 0 }, // ✅ Always a number
        },
    ],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FoodRecognition", FoodRecognitionSchema);
