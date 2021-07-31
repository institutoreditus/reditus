import Button from "@material-ui/core/Button";
import DoneAllIcon from "@material-ui/icons/DoneAll";
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

export const SubscriptionButton = ({
  nextStep,
  totalSteps,
  step,
  update,
}: any) => {
  const classes = useStyles();
  const setDonationModeAndGoToNextStep = (e: any) => {
    // Pushing to data layer is used by the GTM.
    push(ReditusEvent.click, "Donate monthly");
    update("donationMode", "subscriptions");
    nextStep(e);
  };

  return (
    <div>
      {step < totalSteps && (
        <Button
          name="donationMode"
          id="donateMonthly"
          variant="outlined"
          startIcon={<DoneAllIcon />}
          className={classes.outlinedButton}
          value="subscriptions"
          onClick={setDonationModeAndGoToNextStep}
        >
          Doar mensalmente
        </Button>
      )}
    </div>
  );
};

export default SubscriptionButton;
