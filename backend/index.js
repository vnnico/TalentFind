const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// routes
const talentRoutes = require("./routes/talent");
const recruiterRoutes = require("./routes/recruiter");
const companyRoutes = require("./routes/company");
const cvRoutes = require("./routes/cv");

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
app.use("/talent", talentRoutes);
app.use("/recruiter", recruiterRoutes);
app.use("/company", companyRoutes);
app.use("/cv", cvRoutes);

app.get("/", (req, res) => {
  res.send("Talent Find");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
