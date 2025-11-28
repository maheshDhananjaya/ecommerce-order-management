const express = require("express");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/order");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", orderRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use(errorHandler);

module.exports = app;
