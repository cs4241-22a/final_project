const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use("/login", (req, res) => {
  res.send({
    token: "test123", //Check req.username against the datase, send back
  });
});

//add other API calls
app.use(express.static(path.join(__dirname, "client", "build")));

app.listen(3000, () => console.log("Server started"));
