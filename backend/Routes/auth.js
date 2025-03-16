
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middleware/authmiddleware");
require("dotenv").config(); 

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET || "mySecretKey";


router.post("/register", async (req, res) => {
    try {
        let { name, email, password, role, secretKey } = req.body;

        
        name = name.trim();
        email = email.trim();
        password = password.trim();
        
        if (!name || !email || !password || (role === "Admin" && !secretKey)) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        
        if (role === "Admin" && secretKey !== ADMIN_SECRET_KEY) {
            return res.status(403).json({ success: false, message: "Invalid Admin Secret Key!" });
        }

        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Email already in use." });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully." });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
});


router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

       
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
router.post('/change-password', authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        console.log("User ID from Token:", userId); 

        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found in database.");
            return res.status(404).json({ message: "User not found" });
        }

        
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            console.log("Current password is incorrect.");
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        console.log("New Password (before hashing):", newPassword); 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        console.log("Hashed Password:", hashedPassword); 
        user.password = hashedPassword;
        await user.save();

        console.log("Password updated successfully for user:", userId);

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        console.error("Error during password change:", err);
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;
