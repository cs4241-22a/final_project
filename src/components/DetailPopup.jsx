import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box" style={{maxWidth: 'fit-content', maxHeight: 'fit-content', borderRadius: '1rem'}}>
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;