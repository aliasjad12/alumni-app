const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// --------------------------------------
//  AUTH ROUTES WITH PROMETHEUS METRICS
// --------------------------------------

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hash });
    await user.save();

    // Signup does not increment active users
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Increase Prometheus active users metric
    if (req.app.locals.activeUsersGauge) {
      req.app.locals.activeUsersGauge.inc();
    }

    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// LOGOUT ROUTE (Frontend must call this)
router.post('/logout', (req, res) => {
  try {
    if (req.app.locals.activeUsersGauge) {
      req.app.locals.activeUsersGauge.dec();
    }

    return res.json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
