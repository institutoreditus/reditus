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
        onChange={()=>{}}
      />
      <label className={styles.donationModeButton} onClick={selectContribution}>
        Doar uma única vez
      </label>

      <input
        type="radio"
        checked={donation.mode.value === "subscriptions"}
        className={styles.donationModeButton}
        onChange={()=>{}}
      />
      <label className={styles.donationModeButton} onClick={selectSubscription}>
        Doar mensalmente
      </label>
    </div>
  );

  function selectContribution() {
    if (donation.mode.value !== "contributions") {
      donation.mode.set("contributions");
      push(ReditusEvent.click, `Select donation mode: contributions`);
    }
  }

  function selectSubscription() {
    if (donation.mode.value !== "subscriptions") {
      donation.mode.set("subscriptions");
      push(ReditusEvent.click, `Select donation mode: subscriptions`);
    }
  }
};

export default DonationMode;
