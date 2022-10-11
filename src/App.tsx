import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { CanvasScreen, LoginScreen } from "./screens";
import { lightTheme } from "./themes/light";
import { darkTheme } from "./themes/dark";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  const login = true;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {login ? <CanvasScreen /> : <LoginScreen />}
    </ThemeProvider>
  );
}
