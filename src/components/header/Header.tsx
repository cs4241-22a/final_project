import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Welcome to Emoji Place! 😄
        </Typography>
        <Button variant="text">LOGOUT</Button>
      </Toolbar>
    </AppBar>
  );
}
