const express = require("express");
const path = require("path");
const fs = require("fs");
var multer = require("multer");

const PORT = 3000;

//multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var directory = path.join(__dirname, "uploads");
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Message from server</h1>");
});

app.post("/profile", upload.single("avatar"), function (req, res, next) {
  res.status(200);
  res.json({ message: "file uploaded sucessfully" });
});

app.listen(PORT, () => {
  console.log(`Server started at at http://localhost:${PORT}`);
});
