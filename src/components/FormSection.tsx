import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import axios from "axios";
import ResultDisplay from "./ResultDisplay";

const useStyles = makeStyles((theme) => ({
    formInput: {
        width: "100%",

        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid #fff",
        },
        "& .MuiIconButton-root": {
            color: "#fff",
        },
    },
    buttonGrid: {
        textAlign: "center",
    },
    formButton: {
        margin: "0 auto",
        width: "80%",
        textTransform: "capitalize",
    },
}));

function FormSection() {
    const classes = useStyles();

    const [startTimer, setStartTimer] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<number>(new Date().getTime());
    const [selectedTime, setSelectedTime] = useState<number>(new Date().getTime() + 600000);
    const [selectedTz, setSelectedTz] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [clientTz, setClientTz] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [timeResult, setTimeResult] = useState<string | null>(null);
    const [newDateAndTime, setNewDateAndTime] = useState<number | null>(null);
    const [newTzDate, setNewTzDate] = useState<number | null>(null);
    const [positiveCountdown, setPositiveCountdown] = useState<boolean>(false);
    const [negativeCountdown, setNegativeCountdown] = useState<boolean>(false);

    const timerCountdown = () => {
        let utc: number = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        let convertedDate: number | null = newTzDate && new Date(utc + newTzDate * 60 * 60 * 1000).getTime();

        let timeDiff: number | null = newDateAndTime && convertedDate && newDateAndTime - convertedDate;

        if (timeDiff && newDateAndTime && convertedDate && newDateAndTime > convertedDate) {
            let days: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            let hours: number = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes: number = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds: number = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimeResult(`${days !== 0 ? days + "d" : ""} ${hours !== 0 ? hours + "h" : ""} ${minutes !== 0 ? minutes + "m" : ""} ${seconds}s`);
            setPositiveCountdown(true);
            setNegativeCountdown(false);
        } else if (timeDiff) {
            let days: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            let hours: number = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes: number = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds: number = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimeResult(
                `${Math.abs(days + 1) !== 0 ? Math.abs(days + 1) + "d" : ""} ${Math.abs(hours + 1) !== 0 ? Math.abs(hours + 1) + "h" : ""} ${
                    Math.abs(minutes + 1) !== 0 ? Math.abs(minutes + 1) + "m" : ""
                } ${Math.abs(seconds + 1)}s`
            );
            setNegativeCountdown(true);
            setPositiveCountdown(false);
            // TODO: ADD LOADING STATE
            // TODO: IF LOCAL TIME, DONT FETCH API
        }
    };

    const handleDateChange = (date: any): void => {
        setSelectedDate(date);
    };
    const handleTimeChange = (date: any): void => {
        setSelectedTime(date);
    };
    const handleTzChange = (e: any): void => {
        setSelectedTz(e.target.value);
    };
    const handleButtonClick = (): void => {
        const newDate: string = moment(selectedDate).format("ddd MMM D YYYY");
        const newTime: string = moment(selectedTime).format("HH:mm");
        setNewDateAndTime(new Date(`${newDate} ${newTime}`).getTime());

        axios
            .get(`https://timezone.abstractapi.com/v1/current_time?api_key=5658fcb07f9e4c97811ddca399369e7e&location=${selectedTz}`)
            .then((response) => {
                if (response.statusText === "") {
                    console.log("success");
                    setNewTzDate(response.data.gmt_offset);
                    setClientTz(response.data.timezone_location.replace("_", " "));
                    setStartTimer(true);
                } else {
                    // TODO: IF FAILED TO LOAD API
                    console.log("fail");
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (startTimer) {
            timerCountdown();
            const startTimer = setInterval(timerCountdown, 1000);

            return () => {
                clearInterval(startTimer);
            };
        }
    }, [startTimer, newTzDate, newDateAndTime]);

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="space-between" alignItems={"center"} spacing={4}>
                <Grid item xs={12} lg={3}>
                    <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/DD/yyyy"
                        color="secondary"
                        className={classes.formInput}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <KeyboardTimePicker
                        id="time-picker"
                        label="Time picker"
                        color="secondary"
                        className={classes.formInput}
                        value={selectedTime}
                        onChange={handleTimeChange}
                        KeyboardButtonProps={{
                            "aria-label": "change time",
                        }}
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <TextField id="timezone-text" label="Timezone" color="secondary" defaultValue={clientTz} onChange={handleTzChange} className={classes.formInput} />
                </Grid>
                <Grid item xs={12} lg={3} className={classes.buttonGrid}>
                    <Button variant="contained" color="secondary" onClick={handleButtonClick} className={classes.formButton}>
                        Calculate
                    </Button>
                </Grid>
            </Grid>
            <ResultDisplay
                timeResult={timeResult}
                positiveCountdown={positiveCountdown}
                negativeCountdown={negativeCountdown}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                clientTz={clientTz}
            />
        </MuiPickersUtilsProvider>
    );
}

export default FormSection;
