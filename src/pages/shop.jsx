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


function Mailto({ email, subject, body, ...props }) {
  return (
    <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
      {props.children}
    </a>
  );
}

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
      <h1 style={{color: '#ad2b37', padding: '1rem', fontWeight: 'bold'}}>The GoataShop</h1>
      <div class="d-flex">

      <Row m={1} md={4} className="g-4">
      {products.map(product => 
     
      <Col>
      <Card style={{ maxWidth: '20rem', minHeight: '10rem' }} onClick = {() => togglePopup(product)}>
        <Row>
          <Col>
            <Card.Img variant="top" src={product.img} />
          </Col>
      <Col>
      <Col>
        <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
            ${product.price}
            </Card.Text>
        </Card.Body>
      </Col>
      </Col>
      </Row>
    </Card>
    </Col>
       )}    
    </Row>
    </div>
        
    {isOpen && <Popup
      content={<>
        <img src={product.img} style={{width: '15rem', height: '15rem'}}/>
        <h1>{product.name}</h1>
        <h3>${product.price}</h3>
        <p>{product.description}</p>
        <Mailto email={product.email} subject="[GoataShop]">
        Email me if interested!
      </Mailto>
      </>}
      handleClose={togglePopup}
    />}

    </div>
  );
};

export default Shop;