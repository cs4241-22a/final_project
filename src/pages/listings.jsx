import React, {useEffect, useState} from 'react';
import {Container} from '../addListPopup/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import gompei from '../../public/gompei.png';
import Popup from '../components/DetailPopup';

import { useNavigate } from "react-router-dom";
const Listings = (props) => {
const [products, setProducts] = useState([]);
const navigate = useNavigate();

useEffect(() => {
	props.getUser()
  if (!props.user.name) {
    navigate('/login');
  }
  fetch("/getListings", {
    method: "GET",
  }).then(async (response) => {
  let res = await response.json()
  setProducts(res)
})
}, [])

//Popup stuff
const [isEdit, setIsEdit] = useState(false);
const [isAdd, setIsAdd] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [product, setProduct] = useState([]);

function togglePopup(product) {
  setIsOpen(!isOpen);
  setProduct(product);
};

function toggleEditPopup(product) {
	console.log(product.name)
	console.log("Open Edit Window")
	setIsEdit(!isEdit);
	setProduct(product);
  };

  function toggleAddPopup(product) {
	console.log(product.name)
	console.log("Open Add Window")
	setIsAdd(!isAdd);
	setProduct(product);
  };

function editProduct (e, product){
	console.log("Editing")
	let obj = e.target
	let json = { 
		name:obj.name.value,
		category:obj.category.value,
		description:obj.description.value,
		price:obj.price.value
	};
	let body = JSON.stringify(json);

	fetch("/table/" + product.id, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body,
	  }).then(async (response) => {
		await response.json();
	  }).then(location.reload());
};

function deleteProduct(product){
	console.log("HELOOOOOOO")
	console.log("Deleting")
	fetch("/listing/" + product.id, {
		method: "DELETE",
	  }).then(async (response) => {
		await response.json();
	  }).then(location.reload());
};

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
	<div class="d-flex" style={{overflowY: 'scroll', overflowX: 'scroll'}}>
	  <Row m={1} md={3} className="g-4">
	  <button
      className="btn btn-lg btn-danger center modal-button"
      onClick={() => toggleAddPopup(product)}
    >
      Add Product
    </button>
      {products.map(product => 
      <Col>
      <Card style={{ width: '18rem' }} onClick = {() => togglePopup(product)}>
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
      </Card.Body>
      </Col>
      </Row>
    </Card>
    </Col>
       )}    
    
    </Row>
    </div>
    
    {isAdd && <Popup
      content={<>
        <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input 
        className="form-control" 
        id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          className="form-control"
          id="category"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          className="form-control"
          id="description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          className="form-control"
          id="price"
          type="number"
        />
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Add Product
        </button>
      </div>
    </form>
      </>}
      handleClose={toggleAddPopup}
    />}


    {isOpen && <Popup
      content={<>
        <img src={gompei}/>
        <h1>{product.name}</h1>
        <h3>${product.price}</h3>
        <p>{product.description}</p>
		<button variant="primary" id="edit" onClick={(e)=>toggleEditPopup(product)}>Edit</button>
		<button variant="primary" id="delete" onclick={(e)=>deleteProduct(product)}>Delete</button>
      
	  {isEdit && <Popup
	  content={<>
	  <form onSubmit={(e) => editProduct(e, product)}>
	  <div className="form-group">
	  <label htmlFor="edit-name">Product Name</label>
        <input
          className="form-control"
		  value="Hello"
          id="name"
        />
		<label htmlFor="edit-category">Category</label>
		<input
          className="form-control"
          id="categry"
        />
		<label htmlFor="edit-description">Description</label>
		<input
          className="form-control"
          id="description"
        />
		<label htmlFor="edit-price">Price</label>
		<input
          className="form-control"
          id="price"
		  type="number"
        />
		<button className="form-control btn btn-primary" type="submit">
			Edit Product
		</button>
		</div>
		</form>
	  </>}
	  handleClose={toggleEditPopup}
	  />}
	  </>}
      handleClose={togglePopup}
    />}

    </div>
  );
};

const onSubmit= (event) => {
	event.preventDefault(event);
	console.log(event.target.name.value)
	let obj = event.target;
	const json = {
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
	}).then(location.reload())
}

export default Listings;
