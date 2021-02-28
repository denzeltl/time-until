import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "rgba(255, 255, 255, 0.1)",
        marginTop: "3rem",
        borderRadius: "0.6rem",
        padding: "5rem",
        textAlign: "center",
    },
}));

interface ResultDisplayProps {
    timeResult: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ timeResult }) => {
    const classes = useStyles();
    console.log(timeResult);

    return (
        <div className={classes.root}>
            {timeResult === null ? (
                <Typography variant="body1">Please submit a date and time.</Typography>
            ) : (
                <div>
                    <Typography>{timeResult}</Typography>
                </div>
            )}
        </div>
    );
};

export default ResultDisplay;
