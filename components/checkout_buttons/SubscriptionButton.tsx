import { Button } from "@rmwc/button";
import styles from "../Form.module.css";

export const SubscriptionButton = ({
  nextStep,
  totalSteps,
  step,
  props,
}: any) => {
  const update = (e: any) => {
    props.update(e.target.name, e.currentTarget.value);
  };

  return (
    <div>
      {step < totalSteps && (
        <Button
          label="Doar mensalmente"
          name="donationMode"
          id={styles.outlinedButton}
          icon="done_all"
          value="signatureDonation"
          onChange={update}
          onClick={nextStep}
          outlined
        />
      )}
    </div>
  );
};

export default SubscriptionButton;
