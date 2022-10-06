const express = require( 'express' ),
    app = express()
	favicon = require('serve-favicon')

app.use( express.json() )

const path = require('path');

//not in crome apparently
app.use(favicon(path.join(__dirname, 'public/factorio.ico')))

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(process.env.PORT || 3000 )
