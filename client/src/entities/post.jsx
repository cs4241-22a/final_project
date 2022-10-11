
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

const postReply = e => {
  e.preventDefault();
  replies.push(<BasicReply></BasicReply>)
  console.log(replies)
}

  
  class BasicPost extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        add: {
          title: "",
          desc: "",
          date: "",
          time: "",
        },
        delete: {
          title: "",
          desc: "",
          date: "",
          time: "",
          _id: ""
        },
      }
      
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


          <form>
          <label htmlFor="reply" />
          <br />
          <input
            id = "reply"
            type="text"
            name="reply"
            placeholder="235 character limit"
          />
          <br />
          <button onClick={postReply} className="button-34" type="submit">
            Reply
          </button>
          </form>

          <div>
              {<ul> {replies.map(item => <ul>{item}</ul> )} </ul>}
          </div>
      
          </StyledPaper>

        </div>
        
        );
      };
      
    }
    export default BasicPost;