import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CanvasScreen } from "./screens";
import CssBaseline from "@mui/material/CssBaseline";
import { indigo, grey } from "@mui/material/colors";

export default function App() {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: indigo,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          text: {
            color: "white",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      {/* <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}> */}
      <CssBaseline />
      <CanvasScreen />
    </ThemeProvider>
  );
}
