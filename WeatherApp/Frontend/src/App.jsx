import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import WeatherCheck from "./pages/WeatherCheck";
import Report from "./pages/weatherReport"; // import the Report component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/weather" element={<WeatherCheck />} />
        <Route path="/report" element={<Report />} />{" "}
        {/* Add the route for /report */}
      </Routes>
    </Router>
  );
}

export default App;
