import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "rgba(255, 255, 255, 0.1)",
        marginTop: "3rem",
        borderRadius: "0.6rem",
        padding: "3rem",
    },
}));

interface ResultDisplayProps {}

const ResultDisplay: React.FC<ResultDisplayProps> = () => {
    const classes = useStyles();

    return <div className={classes.root}>asd</div>;
};

export default ResultDisplay;
