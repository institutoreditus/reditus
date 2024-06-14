import styles from "./index.module.css";
import Back from "@material-ui/icons/ArrowBack";

const BackButton = () => {
  return (
    <button
      className={styles.backButton}
      onClick={() => {
        window.history.back();
      }}
    >
      <Back />
      <p>Voltar</p>
    </button>
  );
};

export default BackButton;
