import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    formInput: {
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid #fff",
        },
    },
}));

function FormSection() {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

    console.log(new Date());

    const handleDateChange = (date: any): void => {
        setSelectedDate(date);
    };
    const handleTimeChange = (date: any): void => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="space-between" alignItems={"center"}>
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
                <Grid item xs={12} lg={3}>
                    <Button variant="contained" color="secondary">
                        Calculate
                    </Button>
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

export default FormSection;
