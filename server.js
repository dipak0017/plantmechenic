// server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
dotenv.config();
const promptRoutes = require("./routes/promptRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploasdRoutes = require("./routes/uploadRoutes");
const path = require("path");
// const { seedPrompts } = require("./controller/Seed/promptsSeeder");

const app = express();

app.use(cors());
app.use(express.json());

// const __dirname = path.resolve();
// routes

// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use('/api', dashboardRoutes);
app.use('/api/prompts', promptRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes )
app.use('/api/upload', uploasdRoutes);
// app.use('/api/dashboard', require('./routes/dashboardRoutes'));    its new way to define this 

// app.use("/api" , deshboardRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Authentication API");
});

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server startd on port ${PORT}`);
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;

