
import * as React from 'react';
import { styled, Avatar, Fab, AppBar, Typography, Toolbar, Grid, Box, Button, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));


// export default function basicPost() {
  
  
//   return (
//     <div> <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, }} >
//     <Grid container wrap="nowrap" spacing={2}>
//     <Grid item>
//     <Avatar>W</Avatar>
//     </Grid>
//     <Grid item xs>
//     <Typography>{"Hi guys, my first reply here! I am testing how big the replies can be here when you make them!"}</Typography>
//     </Grid>
//     </Grid>
//     </StyledPaper> 
//     </div>
//     );
    
//   }
  
  
  
  
  
  
  class basicPost extends React.Component {
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
        postTable: [],
        replyTable: [],
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
        <Typography>{"Hi guys, my first reply here! I am testing how big the replies can be here when you make them!"}</Typography>
        </Grid>
        </Grid>
        </StyledPaper> 
        </div>
        );
      };
      
      
      
    }
    export default basicPost;