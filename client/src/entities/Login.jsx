import React from "react";
import { Button, Box, AppBar, Typography, Toolbar } from '@mui/material';

class Login extends React.Component {
    render() {
        return (
            <>
                <Box style={{ paddingBottom: 50 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div">
                                Reminders
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Button variant="contained" href="/auth/github">Sign in with GitHub</Button>
            </>
        );
    }
}

export default Login;