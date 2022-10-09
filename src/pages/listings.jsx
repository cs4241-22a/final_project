import React, {useEffect, useState} from 'react';

const Listings = () => {

const [products, setProducts] = useState([]);
useEffect(() => {
  fetch("/getListings", {
    method: "GET",
  }).then(async (response) => {
  let res = await response.json()
  setProducts(res)
})
}, [])

return (
	
	<div
	style={{
		display: 'block',
		justifyContent: 'Left',
		alignItems: 'Left',
		height: '100vh',
		padding: '2%'
	}}
	>
	<h1>Viewing Your Current Listings</h1>
	<div>
      {products.map(product => 
       <div>{JSON.stringify(product)}</div>)}
    </div>
	<button>Add a product</button>
	</div>
);
};

export default Listings;
