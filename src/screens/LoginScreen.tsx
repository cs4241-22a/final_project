import React from "react";
import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import RedditIcon from '@mui/icons-material/Reddit';



export function LoginScreen() {
  return 
  
  <Box display="flex" component="form" width="100%" 
  sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
  autoComplete="off">
    
    <div>
    <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Username"
          variant="filled"
        />
    <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
    {/* if user puts incorrect password. Maybe username */}
    {/* <TextField
          error
          id="filled-error-helper-text"
          label="Error"
          type="password"
          helperText="Incorrect password."
          variant="filled"
        /> */}

<Stack spacing={2} direction="column">
      <Button id="githubbttn" variant="contained" endIcon={<GitHubIcon />}>Login</Button>
      <Button id="redditbuttn" variant="contained" endIcon={<RedditIcon />}>Login</Button>
    </Stack>
  </div>
  </Box>;

  
}
