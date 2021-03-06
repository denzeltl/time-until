import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import FormSection from "./components/FormSection";
import Wrapper from "./components/Wrapper";
import "./App.css";

const useStyles = makeStyles((theme) => ({
    root: {},
    main: {},
    headerTitle: {
        background: theme.palette.primary.main,
        borderBottom: `0.5rem solid ${theme.palette.secondary.main}`,
        textAlign: "center",
        padding: "3rem 0",
    },
}));

function App() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant="h3" component="h1" className={classes.headerTitle}>
                    Time Until
                </Typography>
                <Wrapper>
                    <FormSection />
                </Wrapper>
            </main>
        </div>
    );
}

export default App;
