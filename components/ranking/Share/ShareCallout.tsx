import styles from "./index.module.css";
import WhatsApp from "@material-ui/icons/WhatsApp";
import LinkedIn from "@material-ui/icons/LinkedIn";
import ContentCopyIcon from "@material-ui/icons/FileCopy";
import { DonateButton } from "../Donate/DonateBanner";

const ShareCallout = (props: {
  donate?: boolean;
  whatsApp?: boolean;
  linkedIn?: boolean;
  copy?: boolean;
}) => {
  return (
    <div className={styles.shareCallout}>
      {props.donate && <DonateButton />}
      {props.whatsApp && <WhatsAppButton />}
      {props.linkedIn && <LinkedInButton />}
      {props.copy && <CopyButton />}
    </div>
  );
};

const WhatsAppButton = () => {
  return (
    <button
      className={styles.shareBtn}
      onClick={() => {
        window.open(
          "https://api.whatsapp.com/send?text=Olá! Estou participando do ranking de turmas da UFRJ do Instituto Reditus! Participe também!\nhttps://www.reditus.org.br/ranking"
        );
      }}
    >
      <WhatsApp />
    </button>
  );
};

const LinkedInButton = () => {
  return (
    <button
      className={styles.shareBtn}
      onClick={() => {
        window.open(
          "https://www.linkedin.com/shareArticle?mini=true&url=https://www.reditus.org.br/ranking&title=Ranking de Turmas&summary=Olá! Estou participando do ranking de turmas do Instituto Reditus e gostaria de te convidar a participar também!&source=www.reditus.org.br",
          "_blank"
        );
      }}
    >
      <LinkedIn />
    </button>
  );
};

const CopyButton = () => {
  return (
    <button
      className={styles.shareBtn}
      onClick={() => {
        window.navigator.clipboard.writeText(
          "https://www.reditus.org.br/ranking"
        );
      }}
    >
      <ContentCopyIcon />
    </button>
  );
};

export default ShareCallout;
