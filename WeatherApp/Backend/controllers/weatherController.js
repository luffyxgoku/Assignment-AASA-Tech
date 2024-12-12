const axios = require("axios");
const db = require("../models/db");

exports.fetchWeather = async (req, res) => {
  const { city } = req.body;
  const userId = req.user.id; // Get user ID from JWT

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
    );

    const { temperature, weather_descriptions } = response.data.current;

    // Store the weather search in the database
    db.query(
      "INSERT INTO searches (user_id, city, weather_info, temperature, description) VALUES (?, ?, ?, ?, ?)",
      [
        userId,
        city,
        weather_descriptions[0],
        temperature,
        weather_descriptions[0],
      ],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error storing search data" });
        }
        res.json({
          city,
          temperature,
          description: weather_descriptions[0],
        });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
};

exports.getWeatherReport = (req, res) => {
  db.query(
    `
    SELECT users.username, searches.city, searches.temperature, searches.description
    FROM searches
    JOIN users ON searches.user_id = users.id
    ORDER BY searches.id DESC
    `,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching reports" });
      }
      res.json(results);
    }
  );
};
