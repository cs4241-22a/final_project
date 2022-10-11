
import * as React from 'react';
import { styled, Avatar, Fab, AppBar, Typography, Toolbar, Grid, Box, Button, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead } from '@mui/material';
import './button.css'


  class BasicReply extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
      }
      
    }

    render() {
      return (
        <div> 
        <Box sx={{typography:'body1', border:2, borderColor: 'purple', borderTop:2, borderBottom:2}}>
        REPLY
        </Box>
        <br></br>
        </div>
        
        );
      };
      
    }
    export default BasicReply;