import Head from "next/head";
import styles from "./index.module.css";
import ShareCallout from "../../components/ranking/Share/ShareCallout";
import DonationCallout from "../../components/ranking/Donate/DonateBanner";
import ResultsDisplay from "../../components/ranking/ResultsDisplay/ResultsDisplay";
import Header from "../../components/ranking/Header/Header";

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
          <Header
            tag="Instituto Reditus"
            tagOnClick={() => {
              window.open("https://www.reditus.org.br/", "_blank");
            }}
            title="Ranking de Turmas"
            description="Você pode visualizar as turmas que mais contribuíram e verificar se a sua está entre elas! Uma visão geral do impacto nas receitas só está disponível mediante a realização de uma doação."
          />
          <ResultsDisplay amount={50000} count={200} />
          <Table />
          <ShareCallout donate whatsApp linkedIn copy />
        </div>
      </main>
    </div>
  );
}

const Table = () => {
  const rows: {
    rank: number;
    group: string;
    donation: number;
    donors: number;
  }[] = [];

  for (let i = 0; i < 30; i++) {
    rows.push({
      rank: i + 1,
      group: `Produção ${i * 5 + 2000}`,
      donation: Math.floor(Math.random() * 10000),
      donors: Math.floor(Math.random() * 100),
    });
  }

  return (
    <div className={styles.groupsTable}>
      <table>
        <thead>
          <th>Rank</th>
          <th>Turma</th>
          <th>Valor de doação (R$)</th>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              onClick={() => {
                window.location.href = `/ranking/groups/${row.group}`;
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
