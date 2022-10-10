import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar position="static" component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome to Emoji Place! 😄
        </Typography>
        <Button variant="text">Log out</Button>
      </Toolbar>
    </AppBar>
  );
}
