const mongoose = require("mongoose");

const FoodRecognitionSchema = new mongoose.Schema({
  imageName: String,
  recognizedFoods: [{ name: String, confidence: Number }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FoodRecognition", FoodRecognitionSchema);
