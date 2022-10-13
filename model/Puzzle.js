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

const configuration_3 = {
    "name": "Configuration #3",
    "level": "3",
     "numRows" : "10",
     "numCols" : "10",
     "squares" : [
       { "color" : "red", "row": "4", "column" : "4" },
       { "color" : "red", "row": "6", "column" : "6" },
       { "color" : "orange", "row": "2", "column" : "1" },
       { "color" : "orange", "row": "3", "column" : "3" },
       { "color" : "yellow", "row": "1", "column" : "8" },
       { "color" : "yellow", "row": "8", "column" : "3" },
       { "color" : "green", "row": "2", "column" : "2" },
       { "color" : "green", "row": "4", "column" : "2" },
       { "color" : "cyan", "row": "1", "column" : "0" },
       { "color" : "cyan", "row": "1", "column" : "5" },
       { "color" : "blue", "row": "2", "column" : "3" },
       { "color" : "blue", "row": "6", "column" : "7" },
       { "color" : "purple", "row": "1", "column" : "2" },
       { "color" : "purple", "row": "3", "column" : "2" },
       { "color" : "pink", "row": "9", "column" : "2" },
       { "color" : "pink", "row": "9", "column" : "5" }
          ],
    "actor": {
        "row": "5", "column": "5"
    }
};

const configuration_4 = {
    "name": "Configuration #4",
    "level": "4",
     "numRows" : "10",
     "numCols" : "10",
     "squares" : [
       { "color" : "red", "row": "7", "column" : "5" },
       { "color" : "red", "row": "1", "column" : "6" },
       { "color" : "orange", "row": "3", "column" : "2" },
       { "color" : "orange", "row": "1", "column" : "3" },
       { "color" : "yellow", "row": "7", "column" : "3" },
       { "color" : "yellow", "row": "1", "column" : "8" },
       { "color" : "green", "row": "5", "column" : "3" },
       { "color" : "green", "row": "1", "column" : "5" },
       { "color" : "cyan", "row": "1", "column" : "1" },
       { "color" : "cyan", "row": "3", "column" : "4" },
       { "color" : "blue", "row": "7", "column" : "2" },
       { "color" : "blue", "row": "7", "column" : "4" },
       { "color" : "purple", "row": "3", "column" : "1" },
       { "color" : "purple", "row": "6", "column" : "4" },
       { "color" : "pink", "row": "7", "column" : "7" },
       { "color" : "pink", "row": "5", "column" : "7" },
       { "color" : "grey", "row": "1", "column" : "7" },
       { "color" : "grey", "row": "7", "column" : "8" }
          ],
    "actor": {
        "row": "0", "column": "1"
    }
};

var level1 = JSON.parse(JSON.stringify(configuration_1));
var level2 = JSON.parse(JSON.stringify(configuration_2));
var level3 = JSON.parse(JSON.stringify(configuration_3));
var level4 = JSON.parse(JSON.stringify(configuration_4));