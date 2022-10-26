import { Button } from "@rmwc/button";
import styles from "../Form.module.css";
import { ReditusEvent, push } from "../../helpers/gtm";
import { useContext } from "react";
import { DonationContext } from "../contexts/DonationContext";

export const ContributionButton = ({ nextStep, totalSteps, step }: any) => {
  const donation = useContext(DonationContext);

  const setDonationModeAndGoToNextStep = (e: any) => {
    push(ReditusEvent.click, "Donate once");
    donation.mode.set("contributions");
    nextStep(e);
  };

  return (
    <div>
      {step < totalSteps && (
        <Button
          label="Doar uma única vez"
          name="donationMode"
          id="donateOnlyOnce"
          className={styles.outlinedButton}
          icon="done"
          value="contributions"
          onClick={setDonationModeAndGoToNextStep}
          outlined
        />
      )}
    </div>
  );
};

export default ContributionButton;
