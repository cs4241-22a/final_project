const fs = require("fs");
const path = require("path");

function getRandomName() {
    let data = fs.readFileSync(path.join(__dirname, "names.txt"), "utf-8");
    if (data !== undefined) {
        data = data.replaceAll("\r", "").split("\n");
        return data[Math.floor(Math.random() * data.length)];
    } else return "Steve";
}

module.exports = getRandomName;
