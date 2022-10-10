import React from "react";
import Modal from '@mui/material/Modal';
import Button from '@mui/material';


class Modal extends React.Component {
    constructor(props){
        super(props)
        
        this.state={
            openModal : false
        }
        onClickButton = e => {
            e.preventDefault()
            this.setState({openModal : true})
        }
        onCloseModal = ()=>{
            this.setState({openModal:false})
        }
        
        return (
            <div>
            <button onClick={this.onClickButton}>Click Me</button>
            <Modal open={this.state.openModal} onClose={this.onCloseModal}>
            <h1>You Did it!</h1>
            </Modal>   
            </div>
            );
            
        }
    }
    
    
    
    
    export default Modal;