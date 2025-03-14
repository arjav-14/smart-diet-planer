

const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ✅ Get the latest meal plan
router.get("/latest-meal-plan", async (req, res) => {
    try {
        const latestMessage = await Message.findOne({ mealPlan: { $ne: null } })
            .sort({ timestamp: -1 }) // Get the most recent meal plan
            .select("mealPlan timestamp");

        if (!latestMessage) {
            return res.status(404).json({ message: "No meal plan found." });
        }

        res.json(latestMessage);
    } catch (error) {
        console.error("❌ Error fetching meal plan:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Get all meal plans
router.get("/all-meal-plans", async (req, res) => {
    try {
        const mealPlans = await Message.find({ mealPlan: { $ne: null } }); // Fetch only messages with meal plans
        res.json(mealPlans);
    } catch (error) {
        console.error("❌ Error fetching meal plans:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Delete a specific meal plan
router.delete("/delete-meal-plan/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPlan = await Message.findByIdAndDelete(id);
        if (!deletedPlan) {
            return res.status(404).json({ error: "Meal Plan not found" });
        }
        res.json({ message: "✅ Meal Plan deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting meal plan:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.patch("/update-meal-plan/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { updatedMealPlan } = req.body;

        const updatedPlan = await Message.findByIdAndUpdate(id, { mealPlan: updatedMealPlan }, { new: true });

        if (!updatedPlan) return res.status(404).json({ error: "Meal Plan not found" });

        res.json(updatedPlan);
    } catch (error) {
        console.error("Error updating meal plan:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = router;
