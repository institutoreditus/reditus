import LetsGoButton from "./checkout_buttons/LetsGoButton";
import styles from "./Form.module.css";
import { StepWizardChildProps } from "./reactStepWizardTypes";

const EnterForm = (props: any) => {
  return (
    <div className={styles.donationModeWrapper}>
      <p className="title">
        Faça parte dessa corrente do bem! Ajude a fomentar uma cultura de
        retribuição.
      </p>
      <LetsGoButton step={1} {...props} />
    </div>
  );
};

export default EnterForm;
