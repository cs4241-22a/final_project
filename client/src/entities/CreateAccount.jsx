import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {withRouter} from './withRouter'

const theme = createTheme();

class CreateAccount extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        fetch('/api/createuser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: data.get('email'),
                                   password: data.get('password'),
                                   type: 'create' })
        }).then((response) => {
            if (response.status === 200) {
                this.props.navigate('/verification')
            }
        })
    };

    handleLogin(event) {
        event.preventDefault()
        this.props.navigate('/login')
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Create Account
                    </Button>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={(e) => {
                        this.handleLogin(e)
                    }}
                >
                    Have an account? Login Here!
                </Button>
                </Box>
            </Container>
            </ThemeProvider>
        );
    }
}

export default withRouter(CreateAccount);