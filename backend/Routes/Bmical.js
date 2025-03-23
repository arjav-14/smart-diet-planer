const express = require("express");
const router = express.Router();

// 🏋️ BMI Calculation & Diet Advice
router.post("/calculate", (req, res) => {
    const { weight, height } = req.body;
    
    if (!weight || !height) {
        return res.status(400).json({ error: "Weight and height are required" });
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    
    let category, dietSuggestion;

    if (bmi < 18.5) {
        category = "Underweight";
        dietSuggestion = "Increase protein and calorie intake with healthy fats.";
    } else if (bmi < 24.9) {
        category = "Normal weight";
        dietSuggestion = "Maintain a balanced diet and stay active.";
    } else if (bmi < 29.9) {
        category = "Overweight";
        dietSuggestion = "Reduce carbs, increase fiber, and exercise regularly.";
    } else {
        category = "Obese";
        dietSuggestion = "Follow a low-calorie diet and engage in daily workouts.";
    }

    res.json({ bmi, category, dietSuggestion });
});

module.exports = router;
