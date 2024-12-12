const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

app.use("/auth", authRoutes);
app.use("/weather", weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
