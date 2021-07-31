import React from "react";

import Box from "@material-ui/core/Box";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      color: "#8097B1",
      padding: theme.spacing(4),
      marginTop: 14,
      border: "1px solid rgba(46, 91, 255, 0.08)",
      boxSizing: "border-box",
      boxShadow: "none",
      borderRadius: "1px",
      height: "auto",
      [theme.breakpoints.down("md")]: {
        width: "100% !important",
      },
    },
  })
);

export const DefaultCard = ({ children }: any, props: any) => {
  const classes = useStyles();

  return (
    <Box height={props.height}>
      <Paper className={clsx(classes.paper, props.anotherClasses)}>
        {children}
      </Paper>
    </Box>
  );
};

export default DefaultCard;
