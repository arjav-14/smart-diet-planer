require("dotenv").config();

const config = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/dietplanner",
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

module.exports = config;
