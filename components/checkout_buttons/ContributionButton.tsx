import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import { ReditusEvent, push } from "../../helpers/gtm";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    outlinedButton: {
      color: "#00d4ff",
      width: "100%",
      height: "100%",
      padding: "1.5rem",
      border: "2px solid #00d4ff",
      borderRadius: "2px",
      textTransform: "none",
      fontSize: "15px",
    },
  })
);

export const ContributionButton = ({
  nextStep,
  totalSteps,
  step,
  update,
}: any) => {
  const setDonationModeAndGoToNextStep = (e: any) => {
    push(ReditusEvent.click, "Donate once");
    update("donationMode", "contributions");
    nextStep(e);
  };
  const classes = useStyles();

  return (
    <div>
      {step < totalSteps && (
        <Button
          name="donationMode"
          id="donateOnlyOnce"
          variant="outlined"
          startIcon={<DoneIcon />}
          className={classes.outlinedButton}
          value="contributions"
          onClick={setDonationModeAndGoToNextStep}
        >
          Doar uma única vez
        </Button>
      )}
    </div>
  );
};

export default ContributionButton;
