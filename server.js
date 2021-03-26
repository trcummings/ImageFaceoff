const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

// Pull Port from config
const { PORT } = require("./config");
// Pull in environmental variables
dotenv.config();

const app = express();
const port = PORT;

// For serving static Content
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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/pixabay", async (req, res) => {
  const { searchTerm, maxEntrants } = req.query;

  const result = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&per_page=${maxEntrants}&q=${searchTerm}&image_type=photo`
  );
  const data = await result.json();

  res.send(data);
});

// Start App
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
