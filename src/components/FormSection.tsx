import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

function FormSection() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date: any): void => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        "aria-label": "change date",
                    }}
                />
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        "aria-label": "change time",
                    }}
                />
                <TextField id="timezone-text" label="Timezone" />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

export default FormSection;
