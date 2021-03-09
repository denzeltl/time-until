import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "rgba(255, 255, 255, 0.1)",
        marginTop: "3rem",
        borderRadius: "0.6rem",
        padding: "5rem",
        textAlign: "center",
    },
    timeResult: {
        padding: "3rem",
    },
    resultSentence: {
        marginTop: "0.5rem",
    },
}));

interface ResultDisplayProps {
    timeResult: string | null;
    positiveCountdown: boolean;
    negativeCountdown: boolean;
    selectedDate: number;
    selectedTime: number;
    clientTz: string;
    inputtedTz: string;
    loadFailed: {
        searchFailed: boolean;
        fetchFailed: boolean;
    };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ timeResult, positiveCountdown, negativeCountdown, selectedDate, selectedTime, clientTz, loadFailed, inputtedTz }) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, timeResult && classes.timeResult)}>
            {timeResult === null ? (
                <Typography variant="body1">
                    {loadFailed.fetchFailed === false && loadFailed.searchFailed === false ? "Please calculate a date and time." : ""}
                    {loadFailed.fetchFailed === true ? "Failed to fetch the timezone. Please calculate again." : ""}
                    {loadFailed.searchFailed === true ? `${inputtedTz} was not found. Please search for a new one.` : ""}
                </Typography>
            ) : (
                <div>
                    <Typography variant="h2">{timeResult}</Typography>
                    <Typography variant="h6" className={classes.resultSentence}>
                        {positiveCountdown ? "left until" : "have passed since"} {moment(selectedTime).format("h:mm A")} of {moment(selectedDate).format("MMMM D YYYY")} in {clientTz} timezone
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default ResultDisplay;
