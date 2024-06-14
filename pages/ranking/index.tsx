import Head from "next/head";
import styles from "./index.module.css";
import WhatsApp from "@material-ui/icons/WhatsApp";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Send from "@material-ui/icons/Send";

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
        <div className={styles.content}>
          <Title />

          <ResultsPannel />
          <Table />

          <ShareCallout />
        </div>
      </main>
    </div>
  );
}

const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <button
        className={styles.reditusButton}
        onClick={() => {
          window.open("https://www.reditus.org.br/", "_blank")?.focus();
        }}
      >
        Instituto Reditus
      </button>
      <h1>Ranking de Turmas</h1>
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
      <div className={styles.divider} />
      <p>00:01:20</p>
    </div>
  );
};

const Table = () => {
  const rows: {
    rank: number;
    group: string;
    donation: string;
  }[] = [];

  for (let i = 0; i < 30; i++) {
    rows.push({
      rank: i + 1,
      group: `Turma ${i + 1}`,
      donation: `R$ ${Math.floor(Math.random() * 1000 + 100)}`,
    });
  }

  return (
    <div className={styles.groupsTable}>
      <table>
        <thead>
          <th>Rank</th>
          <th>Turma</th>
          <th>Valor de doação</th>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              onClick={() => {
                window.location.href = `/ranking/${row.group}`;
              }}
            >
              <td style={{ fontWeight: "bold" }}>#{row.rank}</td>
              <td>{row.group}</td>
              <td>{row.donation}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
            "https://api.whatsapp.com/send?text=Olá! Estou participando do ranking de turmas do Instituto Reditus e gostaria de te convidar a participar também! Acesse o link e veja como você pode ajudar: https://www.reditus.org.br/ranking",
            "_blank"
          );
        }}
      >
        <WhatsApp />
      </button>
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
      <button
        className={styles.shareBtn}
        onClick={() => {
          // copy to clipboard
          navigator.clipboard.writeText(
            "Estou participando do ranking de turmas do Instituto Reditus e gostaria de te convidar a participar também! Acesse o link e veja como você pode ajudar: https://www.reditus.org.br/ranking"
          );
        }}
      >
        <Send />
      </button>
    </div>
  );
};
