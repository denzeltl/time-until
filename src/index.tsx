import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2C254A",
        },
        secondary: {
            main: "#FF521B",
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
        fontFamily: ["Poppins", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 660,
            md: 880,
            lg: 1090,
            xl: 1270,
        },
    },
    overrides: {
        MuiInput: {
            root: {
                color: "#fff",
            },
            underline: {
                "&::before": {
                    borderBottom: "1px solid #d2d2d2",
                },
            },
        },
        MuiInputLabel: {
            root: {
                color: "#d2d2d2",
            },
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
