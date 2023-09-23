const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
// const cors = require("cors");
const PORT = 5000;

// UTILITY
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const corsOptions = {
//   origin: "http://localhost:5173/login",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

// DATABASE CONNECTION
const connectToDb = require("./db");
connectToDb();

// ROUTERS
const authRouter = require("./routes/authRouter");
app.use("/api/auth", authRouter);

const courseRouter = require("./routes/courseRouter");
app.use("/api/course", courseRouter);

const reviewRouter = require("./routes/reviewRouter");
app.use("/api/review", reviewRouter);

app.route("/").get((req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`App running at http://127.0.0.1:${PORT}`);
});
