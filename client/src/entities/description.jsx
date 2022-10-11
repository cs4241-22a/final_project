
import * as React from 'react';
import { styled, Avatar, Fab, AppBar, Typography, Toolbar, Grid, Box, Button, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead } from '@mui/material';
import Reminders from './Reminders';

// class BlogDesc extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = { 
//             myValue: '', 
//         }   
//     }

//     handleChange = (e) => this.setState({ 
// 		myValue: e.target.value 
// 	}) 

//     render() { 
// 		return ( 
//             <TextField value ={this.state.myValue} onChange={this.handleChange} fullWidth inputProps={{ maxLength: 250 }} id="blogDesc" label="Start typing here..." multiline variant="filled"/>
// 		) 
// 	} 
// }

class BlogDesc extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        myValue: '',
      };
    }

    handleChange = (e) => this.setState({ 
		myValue: e.target.value 
	}) 
  
    render() {
      return (
        <Reminders descriptions={this.state.myValue} onChange={this.handleChange} label="Start typing here..."/>
      );
    }
  };


    export default BlogDesc;