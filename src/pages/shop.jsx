import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Popup from '../components/DetailPopup';

const Shop = (props) => {

const [products, setProducts] = useState([]);
const navigate = useNavigate();

useEffect(() => {
  props.getUser()
  console.log(!props.user.name)
  if (!props.user.name) {
    navigate('/login');
  }
  else {
    navigate('/shop')
    fetch("/getAllProducts", {
      method: "GET",
    }).then(async (response) => {
    let res = await response.json()
    setProducts(res)
  })}
  
}, [])

//Popup stuff
const [isOpen, setIsOpen] = useState(false);
const [product, setProduct] = useState([]);

function togglePopup(product) {
  setIsOpen(!isOpen);
  setProduct(product);
};

  return (
    <div
      style={{
        display: 'block',
        justifyContent: 'Left',
        alignItems: 'Left',
        padding: '2%'
      }}
    >
      <h1>The GoataShop</h1>
      <div class="d-flex" style={{overflowY: 'scroll', overflowX: 'scroll'}}>

      <Row md={4} className="g-4">
      {products.map(product => 
     
      <Col>
      <Card style={{ width: '18rem' }} onClick = {() => togglePopup(product)}>
        <Row>
          <Col>
      <Card.Img variant="top" src={product.img} />
      </Col>
      <Col>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
        {product.description}
        </Card.Text>
        <Button variant="primary">Contact</Button>
      </Card.Body>
      </Col>
      </Row>
    </Card>
    </Col>
       )}    
    </Row>
    </div>
        
    {isOpen && <Popup
      content={<>
        <img src={product.img}/>
        <h1>{product.name}</h1>
        <h3>${product.price}</h3>
        <p>{product.description}</p>
      </>}
      handleClose={togglePopup}
    />}

    </div>
  );
};

export default Shop;