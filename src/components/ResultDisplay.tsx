import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import SyncLoader from "react-spinners/SyncLoader";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "rgba(255, 255, 255, 0.1)",
        marginTop: "3rem",
        borderRadius: "0.6rem",
        padding: "5rem",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            padding: "5rem 3rem",
        },
    },
    loader: {
        padding: "3rem 0",
    },
    timeResult: {
        padding: "3rem",
        [theme.breakpoints.down("sm")]: {
            padding: "2rem",
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0",
        },
    },
    resultTime: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "3.25rem",
            padding: "2rem 0 0",
        },
    },
    resultSentence: {
        marginTop: "0.5rem",
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.2rem",
            padding: " 0 2rem 2rem",
        },
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
    loading: boolean;
    loadFailed: {
        searchFailed: boolean;
        fetchFailed: boolean;
    };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ timeResult, positiveCountdown, negativeCountdown, selectedDate, selectedTime, clientTz, loadFailed, inputtedTz, loading }) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, timeResult !== null && classes.timeResult)}>
            {loading ? (
                <div className={classes.loader}>
                    <SyncLoader color="#FF521B" loading={loading} size={18} margin={6} />
                </div>
            ) : timeResult === null ? (
                <Typography variant="body1">
                    {loadFailed.fetchFailed === false && loadFailed.searchFailed === false ? "Please calculate a date and time." : ""}
                    {loadFailed.fetchFailed === true ? "Failed to fetch the timezone. Please calculate again." : ""}
                    {loadFailed.searchFailed === true ? `${inputtedTz} was not found. Please search for a new one.` : ""}
                </Typography>
            ) : (
                <div>
                    <Typography variant="h2" className={classes.resultTime}>
                        {timeResult}
                    </Typography>
                    <Typography variant="h6" className={classes.resultSentence}>
                        {positiveCountdown ? "left until" : "have passed since"} {moment(selectedTime).format("h:mm A")} of {moment(selectedDate).format("MMMM D YYYY")} in {clientTz} timezone
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default ResultDisplay;
