import { Button } from "@rmwc/button";
import styles from "../Form.module.css";
import { ReditusEvent, push } from "../../helpers/gtm";
import { useContext } from "react";
import { DonationContext } from "../contexts/Donation";

export const SubscriptionButton = ({
  nextStep,
  totalSteps,
  step,
}: any) => {

  const donation = useContext(DonationContext);
  
  const setDonationModeAndGoToNextStep = (e: any) => {
    // Pushing to data layer is used by the GTM.
    push(ReditusEvent.click, "Donate monthly");
    donation.mode.set('subscriptions');
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
