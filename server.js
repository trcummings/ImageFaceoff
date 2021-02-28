const express = require("express");
const path = require("path");
const cors = require("cors");
const { PORT } = require("./config");

const app = express();
const port = PORT;

// for serving static Content
app.use(express.static("public"));

// For CORS
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Configure Routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Start App
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
