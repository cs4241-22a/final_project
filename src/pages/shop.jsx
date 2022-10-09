
import React, {useEffect, useState} from 'react';
  
const Shop = () => {

const [products, setProducts] = useState([]);
useEffect(() => {
  fetch("/getAllProducts", {
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
      <h1>The GoatAShop</h1>
      <div>
      {products.map(product => 
       <div>{JSON.stringify(product)}</div>)}
    </div>
    </div>
  );
};
  
export default Shop;