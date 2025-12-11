const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();
const client = require("prom-client");

// Enable default metrics (CPU, RAM, event loop, heap, etc)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});


