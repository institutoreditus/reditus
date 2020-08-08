import { IconButton } from "@rmwc/icon-button";

import styles from "../Form.module.css";

export const NavigationButtons = ({
  previousStep,
  firstStep,
  totalSteps,
  step,
}: any) => (
  <div className={styles.navigationSteps}>
    {step > 1 && step < totalSteps && (
      <IconButton
        name="back"
        className={styles.outlinedRoundedButton}
        icon="navigate_before"
        onClick={previousStep}
        ripple={false}
      />
    )}
    {step == 3 && (
      <IconButton
        name="next"
        className={styles.outlinedRoundedButton}
        icon="keyboard_backspace"
        onClick={firstStep}
        ripple={false}
      />
    )}
  </div>
);

export default NavigationButtons;
