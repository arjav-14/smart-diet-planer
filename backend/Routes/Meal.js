
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../Middleware/authmiddleware");


router.get("/latest-meal-plan", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; 
        console.log(`📡 Fetching latest meal plan for user: ${userId}`);

        const latestMessage = await Message.findOne({ userId, mealPlan: { $ne: null } })
            .sort({ timestamp: -1 }) 
            .select("mealPlan timestamp");

        if (!latestMessage) {
            console.warn(`⚠️ No meal plan found for user: ${userId}`);
            return res.status(404).json({ message: "No meal plan found for this user." });
        }

        console.log("✅ Latest meal plan fetched successfully:", latestMessage);
        res.json(latestMessage);
    } catch (error) {
        console.error("❌ Error fetching latest meal plan:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/my-meal-plans", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(`📡 Fetching all meal plans for user: ${userId}`);

        const mealPlans = await Message.find({ userId, mealPlan: { $ne: null } });

        if (mealPlans.length === 0) {
            console.warn(`⚠️ No meal plans found for user: ${userId}`);
            return res.status(404).json({ message: "No meal plans found for this user." });
        }

        console.log("✅ All meal plans fetched successfully.");
        res.json(mealPlans);
    } catch (error) {
        console.error("❌ Error fetching meal plans:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete("/delete-meal-plan/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        console.log(`🗑 Deleting meal plan with ID: ${id} for user: ${userId}`);

        const deletedPlan = await Message.findOneAndDelete({ _id: id, userId });

        if (!deletedPlan) {
            console.warn(`⚠️ Meal plan not found or unauthorized deletion attempt by user: ${userId}`);
            return res.status(404).json({ error: "Meal Plan not found or unauthorized to delete." });
        }

        console.log("✅ Meal Plan deleted successfully:", deletedPlan);
        res.json({ message: "Meal Plan deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting meal plan:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.patch("/update-meal-plan/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { updatedMealPlan } = req.body;
        console.log(`🔄 Updating meal plan with ID: ${id} for user: ${userId}`);

        if (!updatedMealPlan || updatedMealPlan.trim() === "") {
            console.warn("⚠️ Update request with empty meal plan.");
            return res.status(400).json({ error: "Updated meal plan cannot be empty." });
        }

        const updatedPlan = await Message.findOneAndUpdate(
            { _id: id, userId },
            { mealPlan: updatedMealPlan },
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            console.warn(`⚠️ Meal plan not found or unauthorized update attempt by user: ${userId}`);
            return res.status(404).json({ error: "Meal Plan not found or unauthorized to update." });
        }

        console.log("✅ Meal plan updated successfully:", updatedPlan);
        res.json(updatedPlan);
    } catch (error) {
        console.error("❌ Error updating meal plan:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

