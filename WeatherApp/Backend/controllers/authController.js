const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

exports.signup = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Username already exists" });
        }
        return res.status(500).json({ message: "Error signing up" });
      }
      res.status(201).json({ message: "User registered successfully" });
    }
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValid = bcrypt.compareSync(password, results[0].password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token, message: "Login successful" });
    }
  );
};
