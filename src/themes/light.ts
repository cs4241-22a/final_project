import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F58A2",
    },
    secondary: {
      main: "#5B5D72",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          color: "#FFFFFF",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#5C5D70",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#DFE0FF",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: "#040E5C",
        },
      },
    },
  },
  typography: {
    h6: {
      color: "white",
    },
  },
  zIndex: {
    drawer: 2,
  },
});
