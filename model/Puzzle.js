const configuration_1 = {
    "name": "Configuration #1",
    "level": "1",
     "numRows" : "10",
     "numCols" : "10",
     "squares" : [
       { "color" : "red", "row": "3", "column" : "4" },
       { "color" : "red", "row": "5", "column" : "6" },
       { "color" : "yellow", "row": "0", "column" : "9" },
       { "color" : "yellow", "row": "5", "column" : "5" },
       { "color" : "blue", "row": "2", "column" : "6" },
       { "color" : "blue", "row": "5", "column" : "2" },
       { "color" : "green", "row": "2", "column" : "2" },
       { "color" : "green", "row": "7", "column" : "1" },
       { "color" : "purple", "row": "0", "column" : "5" },
       { "color" : "purple", "row": "8", "column" : "4" },
       { "color" : "orange", "row": "9", "column" : "7" },
       { "color" : "orange", "row": "1", "column" : "2" }
      
    ],
    "actor": {
        "row": "4", "column": "3"
    }
};

const configuration_2 = {
    "name": "Configuration #2",
    "level": "2",
     "numRows" : "10",
     "numCols" : "10",
     "squares" : [
       { "color" : "red", "row": "2", "column" : "4" },
       { "color" : "red", "row": "7", "column" : "1" },
       { "color" : "orange", "row": "0", "column" : "5" },
       { "color" : "orange", "row": "6", "column" : "7" },
       { "color" : "yellow", "row": "0", "column" : "1" },
       { "color" : "yellow", "row": "6", "column" : "4" },
       { "color" : "green", "row": "1", "column" : "3" },
       { "color" : "green", "row": "8", "column" : "8" },
       { "color" : "blue", "row": "1", "column" : "0" },
       { "color" : "blue", "row": "4", "column" : "5" },
       { "color" : "purple", "row": "9", "column" : "1" },
       { "color" : "purple", "row": "5", "column" : "9" },
       { "color" : "pink", "row": "0", "column" : "0" },
       { "color" : "pink", "row": "3", "column" : "2" }
          ],
    "actor": {
        "row": "2", "column": "6"
    }
};

var level1 = JSON.parse(JSON.stringify(configuration_1));
var level2 = JSON.parse(JSON.stringify(configuration_2));