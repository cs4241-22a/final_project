import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {withRouter} from './withRouter'

const theme = createTheme();

class VerificationCheck extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = { badVerifcation: false }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        fetch('/api/getVerification', {
            method:'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then((response) => {
            console.log(response)
            if (data.get('Verification') === response.verification) {
                fetch('/api/createUserDatabase', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: response.body.username,
                                        password: response.body.password })
                }).then((response) => {
                    if (response.status === 200) {
                        this.props.navigate('/home')
                    }
                })
            } else {
                this.setState({ badVerifcation: true })
                console.log('BAD Verification!!!!!!!!!!!!!!!!!!!!!')
            }
        })
    }

    /*
    const response = await fetch('/api/getdata', {
            method:'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await response.json();
        this.setState({ table: json });
    */

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
                    Verifciation
                </Typography>
                <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Verification"
                    label="Verification Code"
                    name="Verification"
                    autoFocus
                    error={this.state.badVerifcation}
                    helperText={this.state.badVerifcation ? 'Wrong Code!' : ' '}
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Verify
                    </Button>
                </Box>
                </Box>
            </Container>
            </ThemeProvider>
        );
    }
}

export default withRouter(VerificationCheck);