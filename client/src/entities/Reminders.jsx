import { AppBar, Typography, Toolbar, Grid, Box, Button, TextField } from '@mui/material';
import BasicPost from "./post";
import React from "react";
import {Image} from 'cloudinary-react'
import axios from 'axios';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { MainContext } from '../MainContext';
import {withRouter} from './withRouter'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const url = 'api.cloudinary.com/v1_1/deuj95ephL/image/upload';
const preset = 'images';

const theme = createTheme();

const blogs = []

class Reminders extends React.Component {
    static contextType = MainContext;

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
            currentBlogs: [],
            name: '',
            localImage: ''
        }
        //this.checkAuth = this.checkAuth.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
    }

    goToLogin(event) {
        event.preventDefault();
        console.log('here!')
        this.props.navigate('/login')
    }

    /*checkAuth() {
        if (this.context.profile == null || this.context.profile == undefined) {
            console.log('here mate')
            this.props.navigate('/login')
            this.setState({name: null})
        } else {
            this.setState({name: this.context.profile.name.split("@")[0]})
        }
    }*/

    componentDidMount() {
        console.log('component mounted')
        this.getAllBlogs()
    }

    getAllBlogs = () => {
        console.log('about to get')
        fetch('/api/getblogs', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            this.setState({currentBlogs: response})
            console.log(this.state.currentBlogs)
            //this.checkAuth()
        }).catch(console.log)
    }

    uploadImage = () => {
        if (this.state.image.length <= 0 || this.state.title.length <= 0 || this.state.description <= 0) {
            alert("Missing field")
            return
        }

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
                                           photo: response.data.url,
                                           name: this.context.profile.name.split("@")[0] })
                }).then((response) => {
                    if (response.status === 200) {
                        this.getAllBlogs()
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
        this.setState({open : true, image:'', returnImage:''})
    }
    
    handleClose = e =>{
        e.preventDefault()
        this.setState({open: false, image:'', returnImage:''})
        //console.log(this.state.data)
    }

    render() {
        return (
            <>
                <Box style={{ paddingBottom: 50 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Blogger - {this.context.profile == null ? "Not logged in" : "Logged in as: " + this.context.profile.name.split("@")[0]}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                     <Button style={{marginBottom: 25}} variant="contained" onClick={this.handleOpen} disabled={this.context.profile == null || this.context.profile == undefined}>
                        Make a Post
                    </Button>
                    <Button style={{marginBottom: 25}} variant="contained" onClick={this.goToLogin}>
                        Login
                    </Button>
                    <Grid item xs={3}>
                        {this.state.currentBlogs.reverse().map(item => {
                                return (
                                    <Container style={{paddingBottom: 50, width: 500, height: 500}}>
                                        <Card>
                                            <CardHeader
                                                title={item.title}
                                                subheader={"Posted by " + item.name + " @ " + item.date}
                                                sx={{
                                                    backgroundColor: '#D3D3D3'
                                                }}
                                            />
                                            <CardContent style={{display: "flex", flexDirection: "column",}}>
                                                <Typography variant="h6">
                                                    {item.description}
                                                </Typography>
                                                <Image
                                                    cloudName='deuj95eph'
                                                    publicId={item.photo}
                                                    style={{ width: 300, height: 300}}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Container>
                                )
                            })}
                    </Grid>
                </Grid> 

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
                        <img id="preview" src={this.state.localImage}> 
                        </img>
                        <input
                            style={{ display: "none" }}
                            id="contained-button-file"
                            type="file"
                            name="image" onChange={(e) => {
                                if (e.target.files[0] != null) {
                                this.setState({localImage: URL.createObjectURL(e.target.files[0])})
                                this.setState({image: e.target.files[0]})
                                }
                                console.log(e.target.files[0])
                            }}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
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
}

export default withRouter(Reminders);


