import React from "react";
import ReactDOM, { render } from "react-dom";
import { styled, Avatar, Fab, AppBar, Typography, Toolbar, Grid, Box, Button, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead } from '@mui/material';
import Modal from '@mui/material/Modal';
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import BasicPost from "./post";


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
            open: 0,
            data: {name: "", description: ""}
        }
    }

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
                            '& > :not(style)': { m: 1, width: '45ch', height: '10ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography id="createBlog" variant="h6" component="h2">
                                Create your blog:
                            </Typography>
                            
                            {/* <BlogDesc></BlogDesc> */}
                            
                            <TextField onChange={e => {
                                this.setState({...this.state.data, description: e.target.value})
                                //console.log(data)
                            }} fullWidth inputProps={{ maxLength: 250 }} id="blogDescr" label="Start typing here..." multiline variant="filled"/>
                            <Button onClick={this.addBlog}>Post your blog!</Button>
                            <Button onClick={this.handleClose}>Cancel</Button>
                        </Box>
                    </Box>
                </Modal>
            </div>



            <div>
                {<ul> {blogs.map(item => <ul>{item}</ul> )} </ul>}
            </div>
        </div>
        );
    };
}

export default Reminders;


