
import * as React from 'react';
import { styled, Avatar, Fab, AppBar, Typography, Toolbar, Grid, Box, Button, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead, touchRippleClasses } from '@mui/material';
import './button.css'
import BasicReply from './reply';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));


const replies = []

  class BasicPost extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        add: {
          title: "",
          desc: "",
          time: "",
          _id: ""
        },
        delete: {
          title: "",
          desc: "",
          time: "",
          _id: ""
        },
      }
      
    }
    
    postReply = () => {
      // e.preventDefault();
      replies.push(<BasicReply></BasicReply>)
      console.log(replies)
    }

    render() {
      return (
        <div> <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, }} >
          <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
          <Typography>{"hifaf awwfaf aw fafaw fwa all!"}</Typography>
          </Grid>
          </Grid>

          <Box
                  component="form"
              sx={{
                  '& > :not(style)': { m: 1, width: '45ch', height: '10ch'},
                  }}
                  noValidate
                  autoComplete="off"
              >
                  <Typography id="createBlog" variant="h6" component="h2">
                      "Username" Posted: "Title" at "time"
                  </Typography>
                  
                  {/* <BlogDesc></BlogDesc> */}
                  
                  <TextField fullWidth inputProps={{ maxLength: 250 }} id="blogDescr" label="Reply here..." multiline variant="filled"/>
                  <Button add={this.state.add} onClick={this.postReply}>Post your reply!</Button>
                  <Button onClick={e => { this.setState({...this.state.data, description: e.target.value}) }}>Load replies!</Button>
              </Box>
          <div>
              {<ul> {replies.map(item => <ul>{item}</ul> )} </ul>}
          </div>
      
          </StyledPaper>

        </div>
        
        );
      };
      
    }
    export default BasicPost;