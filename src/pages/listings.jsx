import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Compressor from 'compressorjs';
import Popup from '../components/DetailPopup';

const Listings = (props) => {
const [products, setProducts] = useState([]);
const navigate = useNavigate();

useEffect(() => {
	props.getUser()
  if (!props.user.name) {
    navigate('/login');
  }
  else {
  navigate('/listings')
  fetch("/getListings", {
    method: "GET",
  }).then(async (response) => {
  let res = await response.json()
  setProducts(res)
})}
}, [])

//Popup stuff
const [isEdit, setIsEdit] = useState(false);
const [isAdd, setIsAdd] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [isDelete, setIsDelete] = useState(false);
const [product, setProduct] = useState([]);
const [img, setImage] = useState('');

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
	console.log(product)
  };

  function toggleDeletePopup(product){
	console.log("Open Delete Confirmation Window")
	setIsDelete(!isDelete);
	setProduct(product);
  }

const editProduct = (e) => {
	console.log("Editing")
	setIsOpen(!isOpen);
	let obj = e.target

	let json = { 
		img:product.img,
		name: obj.name.value,
		category:obj.category.value,
		description:obj.description.value,
		price:obj.price.value
	};
	let body = JSON.stringify(json);

	fetch("/listing/" + product._id, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body,
	  }).then(async (response) => {
		let res = await response.json()
		console.log(res)
		setProduct(json)
	  }).then(setIsEdit(!isEdit))//.then(location.reload())
};

const deleteProduct = (e) =>{
	console.log("HELOOOOOOO")
	console.log("Deleting")
	setIsOpen(!isOpen)
	fetch("/listing/" + product._id, {
		method: "DELETE",
	  }).then(async (response) => {
		await response.json();
	  }).then(setIsDelete(!isDelete))//.then(location.reload());
};

function previewFile() {
	const preview = document.querySelector('img');
	const file = document.querySelector('input[type=file]').files[0];
	
	const reader = new FileReader();
  
	reader.addEventListener("load", () => {
	  // convert image file to base64 string
	  setImage(reader.result)

	}, false);
  
	if (file) {
		new Compressor(file, {
			quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
			success: (compressedResult) => {
			  // compressedResult has the compressed file.
			  // Use the compressed file to upload the images to your server.        
			  reader.readAsDataURL(compressedResult);
			},
		  });
	}
  }

  const onSubmit = (event) => {
	event.preventDefault(event);
	console.log(event.target.name.value)
	let obj = event.target;
	
	const json = {
		img: img,
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
	}).then(
		setProducts([json, ...products])
	).then(setIsAdd(!isAdd))
}
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
					<Card.Img variant="top" src={product.img} />
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
	  <input className="form-control" type="file" accept=".png,.jpg" id="pic" onChange ={previewFile} /><br />
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
        <img src={product.img}/>
        <h1>{product.name}</h1>
        <h3>${product.price}</h3>
        <p>{product.description}</p>
		<button className="form-control btn btn-primary" variant="primary" id="edit" onClick={(e)=>toggleEditPopup(product)}>Edit</button>
		<button className="form-control btn btn-primary" variant="primary" id="del" onclick={()=>setIsDelete(!isDelete)}>Del</button>
	  </>}
      handleClose={togglePopup}
    />}

	
{isDelete && <Popup
      content={<>
        <img src={product.img}/>
        <h3>$ Are you sure you want to delete the Product</h3>
		<button className="form-control btn btn-primary" variant="primary" id="ConfirmDelete" onclick={deleteProduct}>Confirm</button>
		<button className="form-control btn btn-primary" variant="primary" id="Cancel" onclick={(e)=>setIsDelete(!isDelete)}>Cancel</button>
	  </>}
      handleClose={setIsDelete(!isDelete)}
    />}


   {isEdit && <Popup
	  content={<>
	  <form onSubmit={editProduct}>
	  <div className="form-group">
	  <label htmlFor="edit-name">Product Name</label>
        <input
          className="form-control"
		  defaultValue={product.name}
          id="name"
        />
		 </div>
      <div className="form-group">
		<label htmlFor="edit-category">Category</label>
		<input
          className="form-control"
		  defaultValue={product.category}
          id="category"
        />
		 </div>
      <div className="form-group">
		<label htmlFor="edit-description">Description</label>
		<input
          className="form-control"
		  defaultValue={product.description}
          id="description"
        />
		 </div>
      <div className="form-group">
		<label htmlFor="edit-price">Price</label>
		<input
          className="form-control"
		  defaultValue={product.price}
          id="price"
		  type="number"
        />
		 </div>
      <div className="form-group">
		<button className="form-control btn btn-primary" type="submit">
			Edit Product
		</button>
		</div>
		</form>
	  </>}
	  handleClose={toggleEditPopup}
	  />}
    </div>
  );
};



export default Listings;