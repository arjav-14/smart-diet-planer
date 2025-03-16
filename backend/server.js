const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// Set EJS as the template engine
dotenv.config(); // Load .env variables

const config = require("./config"); // Importing config
const User = require("./models/Users");
const Message = require("./models/Message");
const Post = require("./models/PostSchema");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Debugging logs
console.log("🔑 Google API Key (Last 4 chars):", process.env.GOOGLE_API_KEY?.slice(-4) || "NOT FOUND");
console.log("🌍 MongoDB URI:", config.MONGO_URI || "NOT FOUND");

// MongoDB Connection
mongoose
  .connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// API Routes
app.get("/", (req, res) => {
  res.send("🚀 Smart Diet Planner API is running...");
});

app.use("/api", require("./Routes/auth"));
app.use("/api", require("./Routes/ChatBot")); // Updated Route for Google AI
const clarifaiRoutes = require('./Routes/clarifai');
app.use('/api', clarifaiRoutes);
const uploadRoutes = require('./Routes/upload');
app.use('/api', uploadRoutes);

const mealRoutes = require("./Routes/Meal");
app.use("/api", mealRoutes);
const PostRoutes = require("./Routes/Community");
app.use("/api" , PostRoutes)
const foodRoutes = require('./Routes/foodRoutes'); // Adjust the path as necessary
app.use('/api', foodRoutes);
app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});
