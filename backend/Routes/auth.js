const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/Users");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, secretKey } = req.body;
        
        
        if (!name || !email || !password || (role === "Admin" && !secretKey)) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required." 
            });
        }

        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ 
                success: false, 
                message: "Email already in use." 
            });
        }

        

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role, 
            secretKey 
        });

        await newUser.save();
        
        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully." 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: "Server error." 
        });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        // Log user from DB
      

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Check if password matches
       
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Status:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = router;
