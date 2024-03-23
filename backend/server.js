require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 👇 import routes patern
const userRoutes = require("./routes/userRoutes");
const childRoutes = require("./routes/childRoutes");
const nurseryRoutes = require("./routes/nurseryRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// 👇 express app
const app = express();

// 👇 middleware 🚨 don't forget to change the origin "http://localhost:5173/"
app.use(
  cors({
    origin: "*",
  })
);
/* parses the JSON data and makes it available in req.body */
app.use(express.json());
/* console.log path and request type  */
app.use((req, res, next) => {
  console.info(req.path, req.method);
  next();
});

// 👇 routes
app.use("/airnbb", userRoutes);
app.use("/airnbb/children", childRoutes);
app.use("/airnbb/nursery", nurseryRoutes);
app.use("/airnbb/availability", availabilityRoutes);
app.use("/airnbb/booking", bookingRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // 👇 listen for request
    app.listen(process.env.DB_PORT, () => {
      console.info("Listening on port", process.env.DB_PORT);
    });
  })
  .catch((error) => {
    console.info(error);
  });
