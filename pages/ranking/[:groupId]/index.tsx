import Head from "next/head";
import styles from "./index.module.css";
import WhatsApp from "@material-ui/icons/WhatsApp";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Send from "@material-ui/icons/Send";
import Back from "@material-ui/icons/ArrowBack";

export default function RankingPage() {
  return (
    <div className={styles.html}>
      <Head>
        <title>Ranking de Turmas</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.rankingPage}>
        <DonationCallout />

        <button
          className={styles.backButton}
          onClick={() => {
            window.history.back();
          }}
        >
          <Back />
          <p>Voltar</p>
        </button>

        <div className={styles.content}>
          <Title />

          <ResultsPannel />
          <Donors donated={false} />

          <ShareCallout />
        </div>
      </main>
    </div>
  );
}

const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <button className={styles.reditusButton}>Engenharia de Produção</button>
      <h1>2000-2005</h1>
      <p>
        Você pode visualizar as turmas que mais contribuíram e verificar se a
        sua está entre elas! Uma visão geral do impacto nas receitas só está
        disponível mediante a realização de uma doação.
      </p>
    </div>
  );
};

const DonationCallout = () => {
  return (
    <div className={styles.donationCallout}>
      <p>Doe para que possamos continuar ajudando!</p>
      <button className={styles.donationButton}>Doar agora!</button>
    </div>
  );
};

const ResultsPannel = () => {
  return (
    <div className={styles.resultsPannel}>
      <p>R$ 12.300,39</p>
    </div>
  );
};

const Donors = ({ donated }: { donated: boolean }) => {
  const members: {
    name: string;
    linkedin: string;
  }[] = [
    {
      name: "João da Silva",
      linkedin: "https://www.linkedin.com/in/joao-da-silva",
    },
    {
      name: "João da Silva",
      linkedin: "https://www.linkedin.com/in/joao-da-silva",
    },
    {
      name: "João da Silva",
      linkedin: "https://www.linkedin.com/in/joao-da-silva",
    },
    {
      name: "João da Silva",
      linkedin: "https://www.linkedin.com/in/joao-da-silva",
    },
    {
      name: "João da Silva",
      linkedin: "https://www.linkedin.com/in/joao-da-silva",
    },
    {
      name: "João da Silva",
      linkedin: "https://www.linkedin.com/in/joao-da-silva",
    },
  ];

  donated;

  return (
    <div className="donorsContainer">
      <div className={donated ? styles.donors : styles.hideDonors}>
        {members.map((member) => (
          <button className={styles.donor}>
            <p>{member.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

const ShareCallout = () => {
  return (
    <div className={styles.shareCallout}>
      <button className={styles.donationButton}>Doar agora</button>{" "}
      <button
        className={styles.shareBtn}
        onClick={() => {
          window.open(
            "https://api.whatsapp.com/send?text=Olá! Conheça o Reditus, uma plataforma que ajuda a sua turma a se manter conectada e a contribuir com a sua universidade! https://reditus.com.br"
          );
        }}
      >
        <WhatsApp />
      </button>
      <button className={styles.shareBtn}>
        <LinkedIn />
      </button>
      <button className={styles.shareBtn}>
        <Send />
      </button>
    </div>
  );
};
