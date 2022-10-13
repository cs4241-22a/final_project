import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CanvasScreen, LoginScreen } from "./screens";
import { lightTheme } from "./themes/light";
import { darkTheme } from "./themes/dark";

export type AuthenticationWrapperProps = {
  authenticated: boolean;
};

function AuthenticationWrapper({ authenticated }: AuthenticationWrapperProps) {
  console.log(authenticated);
  return authenticated ? (
    <Navigate to="/canvas" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default function App() {
  const [render, rerender] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  useEffect(() => {
    (async () => {
      const response = await fetch("/authenticated");
      const json = await response.json();

      console.log(json);

      setAuthenticated(json.authenticated);
      console.log(authenticated);
      rerender(!render);
    })();
  }, []);

  return (
    <Router>
      {render ? null : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={<AuthenticationWrapper authenticated={authenticated} />}
            />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/canvas" element={<CanvasScreen />} />
          </Routes>
        </ThemeProvider>
      )}
    </Router>
  );
}
