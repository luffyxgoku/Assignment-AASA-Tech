import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherReport() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/weather/report",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReport(response.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to fetch report");
      }
    };

    fetchReport();
  }, []);

  return (
    <div>
      <h1>Weather Search Report</h1>
      {report.map((entry, index) => (
        <div key={index}>
          <p>
            <strong>User:</strong> {entry.username}
          </p>
          <p>
            <strong>City:</strong> {entry.city}
          </p>
          <p>
            <strong>Temperature:</strong> {entry.temperature}°C
          </p>
          <p>
            <strong>Description:</strong> {entry.description}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default WeatherReport;
