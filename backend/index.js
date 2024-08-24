const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// routes
const talentRoutes = require("./routes/talent");
const recruiterRoutes = require("./routes/recruiter");

// Model Setup
const app = express();

// Connect to Database
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Ini biar bisa ngirim API
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/talent/", talentRoutes);
app.use("/company", recruiterRoutes);

app.get("/", (req, res) => {
  res.send("Talent Find");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
