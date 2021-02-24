import React from "react";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "1200px",
        padding: "2rem 0",

        [theme.breakpoints.down("lg")]: {
            maxWidth: "1050px",
        },
        [theme.breakpoints.down("md")]: {
            maxWidth: "820px",
        },
        [theme.breakpoints.down("sm")]: {
            maxWidth: "600px",
        },
        [theme.breakpoints.down("xs")]: {
            maxWidth: "390px",
        },
    },
}));

interface WrapperProps {
    children: any;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const classes = useStyles();

    return <Container className={classes.root}>{children}</Container>;
};

export default Wrapper;
