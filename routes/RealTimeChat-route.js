const Websocket = require("ws");
const router = require("express").Router();
const moment = require("moment");

chatroom = [];

router.get("/", (req, res) => {
  res.render("RealTimeChat", { moment: moment, ID: req.user._id, username: req.user.username });
});

//Websocket Server
const wss = new Websocket.Server({ port: 3001 });
wss.broadcast = function(data) {
  wss.clients.forEach(client => client.send(data));
};
wss.on("connection", (ws) => {
  console.log("client connected");

  ws.on("message", (data) => {
    let jsdata = JSON.parse(data);
    let ID = jsdata.ID;
    let username = jsdata.username;
    let Time = jsdata.Time;
    let txt = jsdata.txt;
    let json = { ID: ID, Time: Time, txt: txt, username: username };
    let msg = JSON.stringify(json);
    wss.broadcast(msg)
  });

  ws.on("close", () => {
    console.log("client left");
  });
});

module.exports = router;