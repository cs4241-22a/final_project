//Dependencies
require("dotenv").config();
const express = require('express')
const bodyParser = require("body-parser");
const { Engine } = require("node-uci");

const engines = [
  {
    name: "StockFish",
    exec: "./engines/stockfish",
  },
  {
    name: "Komodo",
    exec: "./engines/komodo-13.02-linux",
  },
  {
    name: "LeelaChessZero",
    exec: "./engines/leela/lc0"
  }
];

//Server Configuration
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Server Endpoints(
app.get("/bestmove", async (req, res) => {
    console.log(req.query)
    const fen = req.query.position
    const engineName = req.query.engine;
    const movetime = req.query.movetime;
    const engineInfo = engines.find((e) => e.name === engineName)
    const engine = new Engine(engineInfo.exec)

    await engine.init()
    await engine.position(fen)
    const output = await engine.go({movetime: movetime})


    res.json(output);
    res.end()
})


//Server Startup
console.log(`Starting Server on Port ${process.env.port}`)
app.listen(process.env.port)