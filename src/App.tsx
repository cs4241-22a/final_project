import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CanvasScreen, LoginScreen } from "./screens";
import CssBaseline from "@mui/material/CssBaseline";

import { lightTheme } from "./themes/light";

export default function App() {
  const login = true;

  return (
    // <ThemeProvider theme={lightTheme}>
    <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
      <CssBaseline />
      {login ? <CanvasScreen /> : <LoginScreen />}
    </ThemeProvider>
  );
}
