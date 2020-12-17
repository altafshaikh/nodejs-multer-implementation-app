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
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});

var upload = multer({ storage: storage }).single("avatar");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Message from server</h1>");
});

app.post("/profile", function (req, res, next) {
  upload(req, res, function (err, result) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500);
      res.json({ message: "unable to upload image" });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(200);
      res.json({ message: err });
    }
    res.status(200);
    res.json({ message: "file uploaded sucessfully", imageURL: req.file.path });
  });
});

app.listen(PORT, () => {
  console.log(`Server started at at http://localhost:${PORT}`);
});
