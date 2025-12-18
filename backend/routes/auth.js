const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const client = require("prom-client");

const router = express.Router();

const loginCounter = new client.Counter({
  name: "user_logins_total",
  help: "Total successful logins"
});

const signupCounter = new client.Counter({
  name: "user_signups_total",
  help: "Total user signups"
});

/* USER SIGNUP */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash });

  signupCounter.inc();

  res.json({ msg: "Signup successful" });
});

/* USER LOGIN */
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid");

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(400).send("Invalid");

  loginCounter.inc();
  req.app.locals.activeUsersGauge.inc();

  const token = jwt.sign(
    { id: user._id, role: "user", name: user.name },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

/* ADMIN LOGIN */
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).send("Unauthorized");
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

router.post("/logout", (req, res) => {
  req.app.locals.activeUsersGauge.dec();
  res.json({ msg: "Logged out" });
});

module.exports = router;
