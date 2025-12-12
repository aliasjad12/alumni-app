const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const client = require("prom-client");
const app = express();

// Connect to MongoDB
connectDB();

// ----- PROMETHEUS METRICS SETUP -----

// Enable default metrics (CPU, memory, event loop, etc)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Custom Prometheus metrics
const httpRequestCount = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"]
});

const activeUsersGauge = new client.Gauge({
  name: "active_users",
  help: "Number of currently active users"
});

// Count every HTTP request
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCount.inc({
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode
    });
  });
  next();
});

// -------------------------------------

app.use(cors({ origin: '*' }));
app.use(express.json());

// Pass custom metrics to routes
app.locals.activeUsersGauge = activeUsersGauge;

// Authentication routes
app.use('/api/auth', require('./routes/auth'));

// /metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
