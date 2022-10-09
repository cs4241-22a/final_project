
const testAdd = function(e){
  // prevent default form action from being carried out
  e.preventDefault()

  const catnameinput = document.querySelector( '#catname' ),
		catnuminput = document.querySelector( '#catnumber' ),
		json = { catname: catnameinput.value,
				catvote: catnuminput.value },
		body = JSON.stringify( json )

  fetch( '/add', {
	method:'POST',
	body 
  })
  .then( function( response ) {
	// do something with the reponse 
	console.log( response )
  })

  return false
}

window.onload = function() {
  const testbutton = document.querySelector( '#testbutton' )
  testbutton.onclick = testAdd
}