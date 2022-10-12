import React, {useEffect, useState} from 'react';
import {Container} from '../Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import gompei from '../../public/gompei.png';
import image from '../Form/index';

const Listings = (props) => {
const [products, setProducts] = useState([]);
const navigate = useNavigate();

useEffect(() => {
	props.getUser()
  if (!props.user.name) {
    navigate('/login');
  }
  navigate('/listings')
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
	<div class="d-flex">
      {products.map(product => 
	  <Col>
      <Card style={{ width: '18rem' }}>
        <Row>
          <Col>
      <Card.Img variant="top" src={gompei} />
      </Col>
      <Col>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
        {product.description}
        </Card.Text>
		<Button variant="primary" onclick={() =>console.log(product.name)}>Edit</Button>
		<Button variant="primary">Delete</Button>      </Card.Body>
      </Col>
      </Row>
    </Card>
    </Col>
       )}
    </div>
	<Container triggerText={'Add Product'} onSubmit={onSubmit}/>
	</div>
);
};
const reader = new FileReader();

function getBinaryFromFile(file) {
	return new Promise((resolve, reject) => {

		reader.addEventListener("load", () => resolve(reader.result));
		reader.addEventListener("error", err => reject(err));

		reader.readAsDataURL(file);
		
	});
}

const onSubmit = (event) => {
	event.preventDefault(event);
	console.log(event.target.name.value)
	let obj = event.target;

	document.getElementById("audio-upload").addEventListener("change", previewFile);


	// function openFile(evt) {
	// 	const fileObject = evt.target.files[0];
	// 	console.log(fileObject)
		
	// 	let binary = getBinaryFromFile(fileObject)
	// 	console.log(binary)
			
	// }
	console.log('2')
	console.log(reader.result)

	const json = {
		img: reader.result,
		name:obj.name.value,
		category:obj.category.value,
		description:obj.description.value,
		price:obj.price.value
	};
	let body = JSON.stringify(json);

	console.log(body)
	fetch("/addListing", {
		method:"POST",
		headers: { "Content-Type": "application/json" },
		body,
	}).then(async(response) =>{
		let res = await response.json()
	})
}

export default Listings;
