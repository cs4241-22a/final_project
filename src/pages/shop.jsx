
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

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
      <div class="d-flex">
      {products.map(product => 
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
        {product.description}
        </Card.Text>
        <Button variant="primary">Contact</Button>
      </Card.Body>
    </Card>
       )}
    </div>
    </div>
  );
};
  
export default Shop;