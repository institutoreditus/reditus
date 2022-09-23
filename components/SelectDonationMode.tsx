import ContributionButton from "./checkout_buttons/ContributionButton";
import { SubscriptionButton } from "./checkout_buttons/SubscriptionButton";
import styles from "./Form.module.css";


const SelectDonationMode = (props : any) => {
  return (
    <div className={styles.donationModeWrapper}>
      <p className="title">
        Faça parte dessa corrente do bem! Ajude a fomentar uma cultura de
        retribuição.
      </p>
      <SubscriptionButton step={1} {...props} />
      <ContributionButton step={1} {...props} />
    </div>
  );
};

export default SelectDonationMode;
