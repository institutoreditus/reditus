import { Button } from "@rmwc/button";
import styles from "../Form.module.css";

 export const ContributionButton = ({
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
          label="Doar uma única vez"
          name="donationMode"
          id={styles.outlinedButton}
          icon="done"
          value="singleDonation"
          onChange={update}
          onClick={nextStep}
          outlined
        />
      )}
    </div>
  );
};

 export default ContributionButton;