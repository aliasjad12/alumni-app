const express = require("express");
const Issue = require("../models/Issue");
const client = require("prom-client");

const router = express.Router();

const issueCounter = new client.Counter({
  name: "medical_issues_total",
  help: "Total medical issues reported"
});

/* USER SUBMITS ISSUE */
router.post("/", async (req, res) => {
  const { userName, medicalIssue, tenure } = req.body;

  await Issue.create({ userName, medicalIssue, tenure });
  issueCounter.inc();

  res.json({ msg: "Issue submitted" });
});

/* ADMIN GET ALL ISSUES */
router.get("/", async (req, res) => {
  const issues = await Issue.find().sort({ createdAt: -1 });
  res.json(issues);
});

module.exports = router;
