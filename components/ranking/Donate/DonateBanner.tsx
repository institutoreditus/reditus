import styles from "./index.module.css";

const DonationCallout = () => {
  return (
    <div className={styles.donationCallout}>
      <p>Doe para que possamos continuar ajudando!</p>
      <DonateButton />
    </div>
  );
};

export const DonateButton = () => {
  return (
    <button
      className={styles.donationButton}
      onClick={() => {
        window.location.href = "/";
      }}
    >
      Doar agora!
    </button>
  );
};

export default DonationCallout;