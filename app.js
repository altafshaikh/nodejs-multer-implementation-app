const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  console.log("REquest recieved");
  res.send("<h1>Message from server</h1>");
});

app.listen(PORT, () => {
  console.log("Server started at at 3000");
});
