const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const path = require("path");
require("dotenv").config();

// routes
const talentRoutes = require("./routes/talent");
const recruiterRoutes = require("./routes/recruiter");
const companyRoutes = require("./routes/company");
const jobRoutes = require("./routes/jobPost");
const cvRoutes = require("./routes/cv");
const jobAppRoutes = require("./routes/jobApplication");

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

// Cloudinary
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Ini biar bisa ngirim API
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use(
  "/files",
  (req, res, next) => {
    if (req.url.endsWith(".pdf")) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline"); // Set header to display PDF inline
    }
    next();
  },
  express.static(path.join(__dirname, "../files"))
);

app.use("/talent", talentRoutes);
app.use("/recruiter", recruiterRoutes);
app.use("/company", companyRoutes);
app.use("/cv", cvRoutes);
app.use("/job", jobRoutes);
app.use("/application", jobAppRoutes);

app.get("/", (req, res) => {
  res.send("Talent Find");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
