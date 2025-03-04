// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const { get } = require("http");

// const app = express();

// //middleware
// app.use(cors());
// app.use(express.json());

// const getData = () => {
//   try {
//     const dataPath = path.join(__dirname, "data.json"); // Absolute path
//     console.log("Loading data from:", dataPath); // Debugging
//     const data = fs.readFileSync(dataPath, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     console.error("Error reading data.json:", error);
//     return [];
//   }
// };

// app.get("/api/data", (req, res) => {
//   res.json(getData());
// });
// // random element from array
// app.get("/api/data/random", (req, res) => {
//   const data = getData();
//   const randomIndex = Math.floor(Math.random() * data.length);
//   res.json(data[randomIndex]);
// });

// // random 10 elements from array
// app.get("/api/data/randoms", (req, res) => {
//   const data = getData();
//   const randomIndex = Math.floor(Math.random() * data.length);
//   const randoms = data.slice(randomIndex, randomIndex + 10);
//   res.json(randoms);
// });

// app.get("/api/data/:id", (req, res) => {
//   const data = getData();
//   const item = data.find((item) => item.id === parseInt(req.params.id));

//   if (item) {
//     res.json(item);
//   } else {
//     res.status(404).json({ message: " Item not found " });
//   }
// });

// //start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });
// // to deploy on vercel
// module.exports = app;
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Debugging: Log if `data.json` exists in Vercel
const dataPath = path.join(__dirname, "data.json");
console.log("Checking data.json at:", dataPath);

if (!fs.existsSync(dataPath)) {
  console.error("🚨 ERROR: data.json NOT FOUND!");
} else {
  console.log("✅ data.json exists.");
}

// ✅ Load JSON Data Safely
const getData = () => {
  try {
    if (!fs.existsSync(dataPath)) {
      console.error("🚨 ERROR: data.json NOT FOUND inside function!");
      return [];
    }

    const data = fs.readFileSync(dataPath, "utf-8");
    console.log("✅ Successfully loaded data.json");
    return JSON.parse(data);
  } catch (error) {
    console.error("🚨 ERROR reading data.json:", error);
    return [];
  }
};

// API Routes
app.get("/api/data", (req, res) => {
  const data = getData();
  res.json(data);
});

// ✅ Export app for Vercel
module.exports = app;
