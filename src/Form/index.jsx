import React from 'react';

export const Form = ({ onSubmit }) => {
  return (
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
  );
};
export default Form;
