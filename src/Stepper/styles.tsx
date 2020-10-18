import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    contentSteps: {
      marginTop: "20px !important",
    },
    headlineStep: {
      margin: "25px auto",
    },
    inputDefaultAmount: {
      width: "32%",
      marginLeft: 0,
      "&:focus": {
        color: "#000",
        background: "linear-gradient(45deg, #2196F3 30%, #00d4ff 90%)",
      },
    },
    inputCustomAmount: {
      marginTop: 5,
      marginBottom: 15,
    },
    amountInCentsWatched: {
      margin: "15px auto",
    },
  })
);

export default useStyles;
