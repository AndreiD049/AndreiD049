const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blog");

// Connect to the database
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.error(`Error occured - ${err.message}`);
  });

app.use(cors());
app.use(express.json());

// Routers
app.use("/api/blogs", blogRouter);

module.exports = app;