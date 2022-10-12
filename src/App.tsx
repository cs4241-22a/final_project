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

  const login = false;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {login ? <CanvasScreen /> : <LoginScreen />}
    </ThemeProvider>
  );
}

// Steps on what to do:
// - npm install
// - npm run build
// - npm start
// - change login to false
// - finish login page (use https://mui.com/core/)
//     - dont worry about component folder rn. just build it all in the LoginScreen.tsx file
