
import * as React from 'react';
import { styled, Avatar, Fab, AppBar, Typography, Toolbar, Grid, Box, Button, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead } from '@mui/material';
import './button.css'

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));

  class BasicReply extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
      }
      
    }

    render() {
      return (
        <div> 
        <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, }} >
        REPLY
        </StyledPaper>
        </div>
        
        );
      };
      
    }
    export default BasicReply;