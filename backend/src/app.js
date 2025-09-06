const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const itemRoutes = require("./routes/item.routes");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
));

app.use("/api/auth", authRoutes);
app.use("/api/item", itemRoutes);

module.exports = app;
