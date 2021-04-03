import { Button } from "@rmwc/button";
import styles from "../Form.module.css";

export const ContributionButton = ({
  nextStep,
  totalSteps,
  step,
  update,
}: any) => {
  const setDonationModeAndGoToNextStep = (e: any) => {
    // Pushing to data layer is used by the GTM.
    // @ts-ignore
    window && window.dataLayer && window.dataLayer.push({event: "donateMonthly"});
    update("donationMode", "contributions");
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
