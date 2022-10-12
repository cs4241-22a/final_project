import React, {useEffect, useState} from 'react';

export const Form = ({ onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  function getBinaryFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("error", err => reject(err));

        reader.readAsBinaryString(file);
    });
    
}
  return (
    <form onSubmit={onSubmit}>
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      {selectedImage && (
        <div>
        {/* <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} /> */}
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <div className="form-group">
      <input
        id="audio-upload"
        className='form-control'
        type="file"
         accept=".jpg,.png"
         onchange="previewFile()"
      />
      
    </div>
    </div>        
          
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
  );
};
export default Form;