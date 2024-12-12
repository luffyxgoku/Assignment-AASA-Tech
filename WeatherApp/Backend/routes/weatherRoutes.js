const express = require("express");
const {
  fetchWeather,
  getWeatherReport,
} = require("../controllers/weatherController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Apply authenticateToken middleware
router.post("/", authenticateToken, fetchWeather);
router.get("/report", authenticateToken, getWeatherReport);

module.exports = router;
