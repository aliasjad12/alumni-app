const express = require("express");
const router = express.Router();
const client = require("prom-client");

router.get("/stats", async (req, res) => {
  try {
    const metrics = await client.register.getMetricsAsJSON();

    const getMetric = (name) =>
      metrics.find((m) => m.name === name)?.values?.[0]?.value || 0;

    res.json({
      totalUsers: getMetric("total_users"),
      activeUsers: getMetric("active_users"),
      totalLogins: getMetric("user_logins_total"),
      totalSignups: getMetric("user_signups_total")
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Dashboard stats error" });
  }
});

module.exports = router;
