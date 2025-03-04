const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { get } = require("http");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

const getData = () => {
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
};

app.get("/api/data", (req, res) => {
  res.json(getData());
});
// random element from array
app.get("/api/data/random", (req, res) => {
  const data = getData();
  const randomIndex = Math.floor(Math.random() * data.length);
  res.json(data[randomIndex]);
});

// random 10 elements from array
app.get("/api/data/randoms", (req, res) => {
  const data = getData();
  const randomIndex = Math.floor(Math.random() * data.length);
  const randoms = data.slice(randomIndex, randomIndex + 10);
  res.json(randoms);
});

app.get("/api/data/:id", (req, res) => {
  const data = getData();
  const item = data.find((item) => item.id === parseInt(req.params.id));

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: " Item not found " });
  }
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// to deploy on vercel
module.exports = app;
