import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import ResultDisplay from "./ResultDsiplay";

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
        width: "60%",
        textTransform: "capitalize",
    },
}));

function FormSection() {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = useState<number>(new Date().getTime());
    const [selectedTime, setSelectedTime] = useState<number>(new Date().getTime());

    const handleDateChange = (date: any): void => {
        setSelectedDate(date);
    };
    const handleTimeChange = (date: any): void => {
        setSelectedTime(date);
    };
    const handleButtonClick = (): void => {
        const newDate: string = moment(selectedDate).format("ddd MMM D YYYY");
        const newTime: string = moment(selectedTime).format("HH:mm");
        const newDateAndTime: number = new Date(`${newDate} ${newTime}`).getTime();

        let timeDiff: number = newDateAndTime - new Date().getTime();
        // Calc
        var days: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        var hours: number = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes: number = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds: number = Math.floor((timeDiff % (1000 * 60)) / 1000);
        console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);

        console.log(newDateAndTime, new Date().getTime());

        // console.log(moment(newDate + newTime).format("dddd, MMMM Do YYYY, h:mm a"));
    };

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
                    <TextField id="timezone-text" label="Timezone" color="secondary" className={classes.formInput} />
                </Grid>
                <Grid item xs={12} lg={3} className={classes.buttonGrid}>
                    <Button variant="contained" color="secondary" onClick={handleButtonClick} className={classes.formButton}>
                        Calculate
                    </Button>
                </Grid>
            </Grid>
            <ResultDisplay />
        </MuiPickersUtilsProvider>
    );
}

export default FormSection;
