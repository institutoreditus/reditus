import { Button } from "@rmwc/button";
import styles from "../Form.module.css";


export const ContributionButton = ({
  nextStep,
  totalSteps,
  step,
  update,
}: any) => {
  const setDonationModeAndGoToNextStep = (e: any) => {
    update("donationMode", "contributions");
    nextStep(e);
  };

  return (
    <div>
      {step < totalSteps && (
        <Button
          label="Doar uma única vez"
          name="donationMode"
          id={styles.outlinedButton}
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
