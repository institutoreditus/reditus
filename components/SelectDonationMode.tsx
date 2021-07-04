import ContributionButton from "./checkout_buttons/ContributionButton";
import { SubscriptionButton } from "./checkout_buttons/SubscriptionButton";
import styles from "./Form.module.css";

const SelectDonationMode = (props: any) => {
  return (
    <div className={styles.donationModeWrapper}>
      <p className="title">
        <b>
          Todas as doações feitas no mês de Julho serão <u>triplicadas</u>!
        </b>
        *
      </p>

      <SubscriptionButton step={1} {...props} />
      <ContributionButton step={1} {...props} />
      <p>
        <span style={{ fontSize: "small" }}>
          * Válido de 04 a 31 de Julho de 2021
        </span>
      </p>
      <p>
        <span style={{ fontSize: "small" }}>
          * Para doações recorrentes, apenas a parcela referente ao mês de Julho
          de 2021 será triplicada
        </span>
      </p>
    </div>
  );
};

export default SelectDonationMode;
