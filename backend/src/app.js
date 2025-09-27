const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const instructorRoutes = require("./routes/instructor");
const adminRoutes = require("./routes/admin");
const superadminRoutes = require("./routes/superadmin");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superadmin", superadminRoutes);

module.exports = app;