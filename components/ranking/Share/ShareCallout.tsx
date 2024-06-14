import styles from "./index.module.css";
import WhatsApp from "@material-ui/icons/WhatsApp";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Send from "@material-ui/icons/Send";
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
          "https://api.whatsapp.com/send?text=Olá! Estou participando do ranking de turmas do Instituto Reditus e gostaria de te convidar a participar também! Acesse o link e veja como você pode ajudar: https://www.reditus.org.br/ranking",
          "_blank"
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
        navigator.clipboard.writeText(
          "Estou participando do ranking de turmas do Instituto Reditus e gostaria de te convidar a participar também! Acesse o link e veja como você pode ajudar: https://www.reditus.org.br/ranking"
        );
      }}
    >
      <Send />
    </button>
  );
};

export default ShareCallout;
