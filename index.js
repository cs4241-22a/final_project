const express  = require( 'express' ),
      app      = express()

const todos = [
  { name:'buy groceries', completed:false }
]

app.use( express.json() )
app.use( express.static( 'public' ) )
app.use( express.static( 'src' ) )


app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  todos.push( req.body )
  res.json( todos )
})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

app.listen( 8080, () => {
    console.log("Server is listening on port: 8080")
});
