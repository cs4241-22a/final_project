const express = require( 'express' ),
    app = express()

app.use( express.json() )

const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(process.env.PORT || 3000 )
