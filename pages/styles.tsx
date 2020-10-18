import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    wrapper: {
      overflow: "hidden",
      margin: 0,
      padding: 0,
    },
    box: {
      height: "100vh",
      padding: theme.spacing(2),
      textAlign: "center",
    },
    leftBox: {
      [theme.breakpoints.down("lg")]: {
        width: "80%",
      },
    },
    rightBox: {
      color: "white",
      backgroundSize: "cover",
      backgroundImage: `url(${"bg.png"})`,
      [`${theme.breakpoints.down("lg")} and (orientation: landscape)`]: {
        overflow: "auto",
        padding: "100px auto",
      },
    },
    rightWrapper: {
      width: "45%",
      [theme.breakpoints.down("md")]: {
        width: "90%",
      },
      [`${theme.breakpoints.down("lg")} and (orientation: landscape)`]: {
        marginTop: 150,
      },
    },
    logo: {
      width: 100,
      marginBottom: 50,
    },
    list: {
      maxWidth: 450,
      color: "red",
    },
    icon: {
      color: theme.palette.primary.light,
    },
    formStepper: {
      marginTop: 50,
    },
  })
);

export default useStyles;
