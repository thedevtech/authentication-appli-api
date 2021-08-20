const express = require("express");
const dotenv = require("dotenv");
const app = express();
const Cors = require("cors");

//Middlewares
app.use(express.json());
app.use(Cors());

//Connecting application to database
const connectDB = require("./databaseConfig");
connectDB();

//Environment Variables
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;

//Configuring Routes
//#1 Login & Signup
const userRoute = require("./routes/user");
app.use("/api/user", userRoute);
//#2 Dashboard
const dashboardRoute = require("./routes/dashboard");
app.use("/api/user/dashboard", dashboardRoute);

//Listening to server on port 8000
app.listen(
  PORT,
  console.log(`Server up and Running successfully on port: ${PORT}`)
);
