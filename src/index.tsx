import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#267fa6",
        },
        secondary: {
            main: "#eb7628",
        },
        success: {
            main: "#42b347",
        },
        error: {
            main: "#ef4a4a",
        },
        background: {
            default: "#ffffff",
        },
    },
    typography: {
        fontFamily: ["Lato", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
