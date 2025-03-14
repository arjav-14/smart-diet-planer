
const express = require("express");
const router = express.Router();
const { analyzeFoodImage, upload } = require("../Controllers/clarifaiController");

// Use the multer middleware before the controller
router.post("/analyze-food", upload.single("image"), analyzeFoodImage);

module.exports = router;
