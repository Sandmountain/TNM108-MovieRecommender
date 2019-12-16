import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
//import { dark } from "@material-ui/core/styles/createPalette";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: {
      main: "#e6432f"
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
