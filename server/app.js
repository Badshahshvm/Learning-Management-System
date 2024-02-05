const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const userRoute = require("./routes/user.routes");
const courseRoute = require("./routes/course.routes");
const errorMiddleware = require("./middlewares/error.middlewares");
const paymentRouter = require("./routes/payment.routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use("/ping", function (req, res) {
  res.send("/pong");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/payments", paymentRouter);

app.get("/", (req, res) => {
  res.send("< h1>hello</h1>");
});

// Routes of 3 modules

app.all("*", (req, res) => {
  res.status(404).send("Oops! Not Found");
});
app.use(errorMiddleware);

module.exports = app;
