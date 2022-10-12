import ReactDOM, { render } from "react-dom";
import { styled, Avatar, Fab, AppBar, Typography, Toolbar, Grid, Box, Button, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead } from '@mui/material';
import Modal from '@mui/material/Modal';
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import BasicPost from "./post";
import React, { useState, useEffect } from "react";
import {Image} from 'cloudinary-react'
import axios from 'axios';


const url = 'api.cloudinary.com/v1_1/deuj95ephL/image/upload';
const preset = 'images';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const centerStyle = {
    display: 'flex',
    alignItems: "center",
    direction: "row",
    flexDirection: 'column',
    background: "lightgrey"
  };


const blogs = []

class Reminders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            data: {name: "", description: ""},
            image:'',
            returnImage:''
        }
    }

    uploadImage = () => {
        const formData = new FormData();
        console.log(this.state.image)
        formData.append('file',this.state.image)
        formData.append("upload_preset","images")
    
        axios.post("https://api.cloudinary.com/v1_1/deuj95eph/image/upload",formData)
        .then((response) => {
            this.setState({returnImage: response.data.url})
            console.log(response)
        });
      }


      async onSubmit(){
        const formData = new FormData();
        formData.append('file', this.image);
        formData.append('upload_preset', preset);
        try {
          this.setState({setLoading: true})
          const res = await axios.post(url, formData);
          const imageUrl = res.data.secure_url;
          console.log("before")
          const image = await axios.post('http://localhost:3001/upload', {
            imageUrl
          });
          console.log("after")
           this.setState({setLoading: false})
           this.setState({setImage: image.data})
        } catch (err) {
          console.error(err);
        }
      };

    addBlog = () => {
        blogs.push(<BasicPost></BasicPost>)
        console.log(blogs)
    }

    handleOpen = e =>{
        e.preventDefault()
        this.setState({open : true})
    }
    
    handleClose = e =>{
        e.preventDefault()
        this.setState({open: false})
    }
        
    render() {
        return (
        <div style={centerStyle}>
            <div>
                <Box sx={{ height:"fit-content", width: 'fit-content', maxWidth: 500, borderRadius:3, borderWidth:1, border:5, borderColor:"navy" }}>
                    <Typography variant="h3" gutterBottom>
                    Blogger
                    </Typography>
                </Box>
                <Fab style={{ backgroundColor:"green", color:"black", width:75, height:75}} onClick={this.handleOpen}>Make a post!</Fab>
                <Modal
                    id="modalPost"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="postMaker"
                    aria-describedby="blogDescr"
                >
                    <Box sx={style}>
                    <Box
                            component="form"
                        sx={{
                            '& > :not(style)': { m: 0, width: '45ch', height: '10ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography id="createBlog" variant="h6" component="h2">
                                Create your blog:
                            </Typography>
                            
                            {/* <BlogDesc></BlogDesc> */}
                            
                            <TextField onChange={e => {
                                this.setState({...this.state.data, title: e.target.value})
                            }} fullWidth inputProps={{ maxLength: 250 }} id="blogTitle" label="Enter title here..." multiline variant="filled"/>
                            <TextField onChange={e => {
                                this.setState({...this.state.data, description: e.target.value})
                            }} fullWidth inputProps={{ maxLength: 250 }} id="blogDescr" label="Enter blog here..." multiline variant="filled"/>
                            <Button onClick={this.addBlog}>Post your blog!</Button>
                            <Button onClick={this.handleClose}>Cancel</Button>
                        </Box>
                    </Box>
                </Modal>
            </div>



            <div>
              <h1 >React Image Upload</h1>
              <div >
                <div>
                  <span>Browse</span>
                  <input type="file" name="image" onChange={(e) => this.setState({image: e.target.files[0]})}/>
                </div>
              </div>
          </div>

          
          <div>
            <button onClick={this.uploadImage}>Upload Image</button>
          </div>

          <Image
            cloudName='deuj95eph'
            publicId={this.state.returnImage}
          />



            <div>
                {<ul> {blogs.map(item => <ul>{item}</ul> )} </ul>}
            </div>
        </div>
        );
    };
}

export default Reminders;


