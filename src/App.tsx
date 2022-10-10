import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CanvasScreen } from "./screens";
import CssBaseline from "@mui/material/CssBaseline";

import { lightTheme } from "./themes/light";

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      {/* <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}> */}
      <CssBaseline />
      <CanvasScreen />
    </ThemeProvider>
  );
}
