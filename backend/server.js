const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const client = require("prom-client");
const User = require("./models/User");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// ---------- PROMETHEUS ----------
client.collectDefaultMetrics();

// Total requests
const httpRequestCount = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"]
});

// Request duration
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

// Active users
const activeUsersGauge = new client.Gauge({
  name: "active_users",
  help: "Currently logged in users"
});

// Total users
const totalUsersGauge = new client.Gauge({
  name: "total_users",
  help: "Total registered users"
});

app.locals.activeUsersGauge = activeUsersGauge;

// Middleware
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    httpRequestCount.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });
    end({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });
  });
  next();
});

// Update total users every 10s
setInterval(async () => {
  const count = await User.countDocuments();
  totalUsersGauge.set(count);
}, 10000);

// Routes
app.use("/api/auth", require("./routes/auth"));

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});
app.use("/api/users", require("./routes/users"));
app.use("/api/services", require("./routes/services"));
app.use("/api/dashboard", require("./routes/dashboard"));



app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on port 5000");
});
