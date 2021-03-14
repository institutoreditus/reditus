import { Button } from "@rmwc/button";
import styles from "../Form.module.css";

export const SubscriptionButton = ({
  nextStep,
  totalSteps,
  step,
  update,
}: any) => {
  const setDonationModeAndGoToNextStep = (e: any) => {
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
