const express = require("express");
const formRouter = require("./routers/formRouter.js");
const otpRouter = require("./routers/otpRouter.js");
const path = require("path");
const db = require("./config/db/db.js");

const app = express();

db.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build_client")));
app.use(express.static(path.join(__dirname, "build_frontend")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/otp", otpRouter);
app.use("/api/form", formRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build_client", "index.html"));
});

app.get("/buy-from-home", (req, res) => {
  res.sendFile(path.join(__dirname, "build_frontend", "index.html"));
});

app.use((err, req, res, next) => {
  res
    .status(500)
    .send(
      `Internal Server Error: Try Again after some time. \n ERR_MSG: ${err.message}`
    );
});

const PORT = "4000";
app.listen(PORT, () => {
  console.log("Server has started...");
});
