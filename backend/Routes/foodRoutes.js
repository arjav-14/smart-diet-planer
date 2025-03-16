const express = require("express");
const router = express.Router();
const { analyzeFoodImage, upload } = require("../Controllers/clarifaiController");

router.post("/analyze-food", upload.single("image"), analyzeFoodImage);

module.exports = router;
