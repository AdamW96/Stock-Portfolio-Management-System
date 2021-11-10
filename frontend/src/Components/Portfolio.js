import React, { useState } from "react";
import Navigation from "../Components/Navigation";
import Left from "../Components/Left";
import Right from "../Components/Right";
import Feed from "../Components/Feed";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import AuthService from "../services/auth-service";
const useStyles = makeStyles((theme)=>({
    container: {
        paddingTop: theme.spacing(12),
        // borderRight:'1px solid #ece7e7',
        height: "100vh",
      },
}))

export default function Portfolio() {
    const classes = useStyles();
    return (
      <>
        <Container className={classes.container}>
        </Container>
      </>
    );
}