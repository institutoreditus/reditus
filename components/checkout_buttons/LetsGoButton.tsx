import { Button } from "@rmwc/button";
import styles from "../Form.module.css";

export const LetsGoButton = ({
  nextStep,
  totalSteps,
  step,
}: any) => {

  const goToNextStep = (e: any) => {
    nextStep(e);
  };

  return (
    <div>
      {step < totalSteps && (
        <Button
          label="Quero doar!"
          name="donationMode"
          id="donateOnlyOnce"
          className={styles.outlinedButton}
          icon="done"
          value="contributions"
          onClick={goToNextStep}
          outlined
        />
      )}
    </div>
  );
};

export default LetsGoButton;
