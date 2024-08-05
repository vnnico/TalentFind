const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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

app.get("/", (req, res) => {
  res.send("Talent Find");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
