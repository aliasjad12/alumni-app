const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});

