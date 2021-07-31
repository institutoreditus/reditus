import { IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    navigationSteps: {
      marginBottom: "28px",
    },
    outlinedRoundedButton: {
      padding: "0 10px",
      marginRight: "20px",
      height: "48px",
      border: "2px solid transparent",
      borderRadius: "100px",
      color: "white",
      "&:hover": {
        borderColor: "#00d4ff",
        transition: ".1s ease-in",
      },
    },
  })
);

export const NavigationButtons = ({
  previousStep,
  firstStep,
  totalSteps,
  step,
}: any) => {
  const classes = useStyles();

  return (
    <div className={classes.navigationSteps}>
      {step > 1 && step < totalSteps && (
        <IconButton
          aria-label="previous-step"
          name="back"
          className={classes.outlinedRoundedButton}
          onClick={previousStep}
          disableRipple
        >
          <NavigateBeforeIcon />
        </IconButton>
      )}
      {step >= 3 && (
        <IconButton
          aria-label="to home"
          name="to home"
          className={classes.outlinedRoundedButton}
          onClick={firstStep}
          disableRipple
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      )}
    </div>
  );
};

export default NavigationButtons;
