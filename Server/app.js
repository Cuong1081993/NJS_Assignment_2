const path = require("path");
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotel");
const adminRoutes = require("./routes/admin");

const MONGO_URL =
  "mongodb+srv://ntqcuong:PLEem8PpXjtucEU6@cluster0.shrhqy9.mongodb.net/hotel?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  const status = err.code || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(MONGO_URL)
  .then((result) => {
    app.listen(5000);
    console.log("Connected Mongo");
  })
  .catch((err) => {
    console.log(err);
  });
