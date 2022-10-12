import ReactDOM, { render } from "react-dom";
import { styled, Avatar, Fab, AppBar, Typography, Toolbar, Grid, Box, Button, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead } from '@mui/material';
import Modal from '@mui/material/Modal';
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import BasicPost from "./post";
import React, { useState, useEffect } from "react";
import {Image} from 'cloudinary-react'
import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';

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
            //data: {name: "", date: "", description: ""},
            title: '',
            date: '',
            description: '',
            image:'',
            returnImage:'',
            currentBlogs: []
        }
    }

    componentDidMount() {
        fetch('/api/getblogs', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            this.setState({currentBlogs: response})
            console.log(this.state.currentBlogs)
        })
    }

    uploadImage = () => {
        const formData = new FormData();
        console.log(this.state.image)
        formData.append('file',this.state.image)
        formData.append("upload_preset","images")
    
        axios.post("https://api.cloudinary.com/v1_1/deuj95eph/image/upload", formData)
        .then((response) => {
            if (response.status === 200) {
                fetch('/api/postblog', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: this.state.title,
                                           description: this.state.description,
                                           date: this.state.date,
                                           photo: response.data.url })
                }).then((response) => {
                    if (response.status === 200) {
                        //this.props.navigate('/verification')
                    }
                })
            }
            //this.setState({returnImage: response.data.url})
            //console.log(response)
        });
        
        
        //console.log(this.state.title)
        //console.log(this.state.description)
        //console.log(this.state.date)
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
        //console.log(this.state.data)
    }

    render() {
        return (
            <>
                <Box style={{ paddingBottom: 50 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Blogger
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Button variant="contained" onClick={this.handleOpen}>
                    Make a Post
                </Button>
                {this.state.currentBlogs.reverse().map(item => {
                    return (
                        <Container component="main" style={{paddingBottom: 50}}>
                            <Grid container spacing={5} alignItems="flex-end">
                            <Grid
                                item
                                key={item.date}
                                xs={12}
                                //sm={tier.title === 'Enterprise' ? 12 : 6}
                                md={4}
                                >
                                <Card>
                                    <CardHeader
                                    title={item.title}
                                    subheader={item.date}
                                    sx={{
                                        backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[200]
                                            : theme.palette.grey[700],
                                    }}
                                    />
                                    <CardContent style={{display: "flex", flexDirection: "column",}}>
                                        <Typography variant="h6">
                                            {item.description}
                                        </Typography>
                                        <Image
                                            cloudName='deuj95eph'
                                            publicId={item.photo}
                                        />
                                    </CardContent>
                                </Card>
                                </Grid>
                            </Grid>
                        </Container>
                    )
                })}

                <Dialog onClose={this.handleClose} open={this.state.open} fullWidth={ true } maxWidth={"md"}>
                    <div style={{width: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <DialogTitle>Make a Post</DialogTitle>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Title"
                            autoFocus
                            onChange={e => {
                                this.setState({title: e.target.value})
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Description"
                            autoFocus
                            onChange={e => {
                                this.setState({description: e.target.value})
                            }}
                        />
                        <Typography variant="h6">
                            {this.state.image.name}
                        </Typography>
                        <input
                            style={{ display: "none" }}
                            id="contained-button-file"
                            type="file"
                            name="image" onChange={(e) => {
                                this.setState({image: e.target.files[0]})
                                console.log(e.target.files[0])
                            }}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                        {/*<Button variant="contained" component="label" onClick={this.handleOpen} style={{margin: 25}}>
                            Upload Photo
                            <input type="file" hidden onChange={(e) => this.setState({image: e.target.files[0]})}/>
        </Button>*/}
                        <Button variant="contained" onClick={(e) => {
                            this.setState({date: new Date().toLocaleString()}, () => {
                                this.uploadImage()
                                this.handleClose(e)
                            })
                        }} style={{margin: 25}}>
                            Post
                        </Button>
                    </div>
                </Dialog>
            </>
        )
    }
    
    /*
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
    };*/
}

export default Reminders;


