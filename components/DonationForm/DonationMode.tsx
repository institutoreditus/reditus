import { useContext } from "react";
import styles from "../Form.module.css";
import { ReditusEvent, push } from "../../helpers/gtm";

import { DonationContext } from "../contexts/DonationContext";

export const DonationMode = () => {
  const donation = useContext(DonationContext);

  return (
    <div className={styles.donationModeWrapper}>
      <input
        type="radio"
        checked={donation.mode.value === "contributions"}
        className={styles.donationModeButton}
      />
      <label className={styles.donationModeButton} onClick={onChange}>
        Doar uma única vez
      </label>

      <input
        type="radio"
        checked={donation.mode.value === "subscriptions"}
        className={styles.donationModeButton}
      />
      <label className={styles.donationModeButton} onClick={onChange}>
        Doar mensalmente
      </label>
    </div>
  );

  function onChange() {
    console.log("aqui");
    donation.mode.set(donation.isMonthly ? "contributions" : "subscriptions");
    push(
      ReditusEvent.click,
      `Select donation mode: ${
        donation.isMonthly ? "contributions" : "subscriptions"
      }`
    );
  }
};

export default DonationMode;
