import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

export function LoginScreen() {
  function authenticate() {
    window.open(`http://${window.location.host}/login/auth/github`, "_self");
  }

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        id="githubbttn"
        variant="contained"
        endIcon={<GitHubIcon />}
        onClick={authenticate}
      >
        Login
      </Button>
    </Box>
  );
}
