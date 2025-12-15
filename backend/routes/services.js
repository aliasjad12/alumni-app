const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json([
    { name: "Backend API", status: "UP", port: 5000 },
    { name: "MongoDB", status: mongoose.connection.readyState === 1 ? "UP" : "DOWN" },
    { name: "Prometheus", status: "UP", port: 9090 },
    { name: "Grafana", status: "UP", port: 3001 }
  ]);
});

module.exports = router;
