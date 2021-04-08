import { Button } from "@rmwc/button";
import styles from "../Form.module.css";
import { ReditusEvent, push } from "../../helpers/gtm";

export const SubscriptionButton = ({
  nextStep,
  totalSteps,
  step,
  update,
}: any) => {
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
          label="Doar mensalmente"
          name="donationMode"
          id="donateMonthly"
          className={styles.outlinedButton}
          icon="done_all"
          value="subscriptions"
          onClick={setDonationModeAndGoToNextStep}
          outlined
        />
      )}
    </div>
  );
};

export default SubscriptionButton;
