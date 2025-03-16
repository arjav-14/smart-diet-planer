
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     try {
//         // Get Authorization header
//         const authHeader = req.headers.authorization;

//         // Check if header exists and has a Bearer token
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ error: "Access denied. No token provided." });
//         }

//         // Extract the token from the Bearer scheme
//         const token = authHeader.split(" ")[1];

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user info to request object

//         next(); // Move to next middleware or route handler
//     } catch (error) {
//         return res.status(403).json({ error: "Invalid or expired token." });
//     }
// };

// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); // Debugging

        // Check if the Authorization header is missing or incorrectly formatted
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("No token provided or incorrect format.");
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token); // Debugging

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Payload:", decoded); // Debugging

        req.user = decoded; // Attach user info to request object
        next(); // Continue to the next middleware or route
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Log the exact error
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;
