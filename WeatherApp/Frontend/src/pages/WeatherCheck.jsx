import React, { useState } from "react";
import axios from "axios";

function WeatherCheck() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      const response = await axios.post(
        "http://localhost:5000/weather",
        { city },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );
      setWeatherInfo(response.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch the weather data");
    }
  };

  return (
    <div>
      <h1>Weather Checker</h1>
      <input
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weatherInfo && (
        <div>
          <h2>Weather Information for {weatherInfo.city}</h2>
          <p>Temperature: {weatherInfo.temperature}°C</p>
          <p>Description: {weatherInfo.description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherCheck;
