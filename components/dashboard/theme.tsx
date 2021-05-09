import { createMuiTheme } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00d4ff",
    },
    secondary: {
      main: "#0E0B1F",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#F7FAFC",
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#e6e5e8",
      main: "#282c34",
      dark: "#e6e5e8",
      contrastText: "#e6e5e8",
    },
    secondary: {
      main: "#ff1744",
    },
    background: {
      default: "#1c2025",
      paper: "#282c34",
    },
    text: {
      primary: "#e6e5e8",
      secondary: "#adb0bb",
    },
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00d4ff",
    },
    secondary: {
      main: "#0E0B1F",
    },
    background: {
      default: "#F7FAFC",
      paper: colors.common.white,
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  typography: {
    fontFamily: "'Open sans', sans-serif !important",
  },
  transitions: {
    duration: {
      enteringScreen: 0.4,
      leavingScreen: 0.4,
    },
  },
  overrides: {
    MuiDrawer: {
      paper: {
        overflow: "hidden !important",
      },
    },
    MuiTypography: {
      body1: {
        alignSelf: "center",
      },
      body2: {
        fontFamily: "'Rubik', sans-serif !important",
      },
    },
    MuiPaper: {
      root: {
        display: "flex",
        flexDirection: "column",
        color: "#8097B1",
        border: "1px solid rgba(46, 91, 255, 0.08)",
        boxSizing: "border-box",
        boxShadow: "none !important",
        borderRadius: "1px",
      },
    },
    MuiButton: {
      root: {
        fontFamily: "'Open sans', sans-serif !important",
        fontSize: 15,
        textTransform: "none",
        background: "linear-gradient(45deg, #2196F3 30%, #00d4ff 90%)",
        borderRadius: 2,
        color: "black",
        fontWeight: 600,
        height: 66,
        padding: "0 30px",
        margin: "7px auto",
      },
      outlined: {
        background: "transparent",
        borderWidth: "1.5px !important",
        borderColor: "#00d4ff !important",
      },
    },
    MuiButtonGroup: {
      root: {
        marginBottom: 15,
        width: "100%",
      },
    },
    MuiInputLabel: {
      root: {
        fontWeight: 400,
      },
      formControl: {
        transform: "translate(0, 12px) scale(1)",
      },
    },
    MuiIcon: {
      fontSizeSmall: {
        fontSize: 15,
      },
    },
  },
});
