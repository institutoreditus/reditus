import Head from "next/head";
import styles from "./index.module.css";
import ShareCallout from "../../components/ranking/Share/ShareCallout";
import DonationCallout from "../../components/ranking/Donate/DonateBanner";
import ResultsDisplay from "../../components/ranking/ResultsDisplay/ResultsDisplay";
import Header from "../../components/ranking/Header/Header";
import { useEffect, useState } from "react";
import { GetRankingData } from "../api/ranking/types";

export default function RankingPage() {
  const [rankingData, setRankingData] = useState<GetRankingData>({
    amount: 0,
    numberOfDonors: 0,
    ranking: [],
  });

  const fetchRankingData = async () => {
    const response = await fetch("/api/ranking");
    const data = await response.json();
    setRankingData(data);
  };

  useEffect(() => {
    fetchRankingData();
  }, []);

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
            description="
            O Instituto Reditus é uma associação privada, sem fins lucrativos, formada por alunos e ex-alunos da UFRJ.
            Nosso objetivo é fortalecer a comunidade da UFRJ e fomentanar a cultura de retribuição para aprimorando a experiência educacional.
            Convide sua turma para participar! :)
            "
          />
          <ResultsDisplay
            amount={rankingData.amount}
            count={rankingData.numberOfDonors}
          />
          <Table ranking={rankingData.ranking} />
          <ShareCallout donate whatsApp linkedIn copy />
        </div>
      </main>
    </div>
  );
}

const Table = (props: { ranking: GetRankingData["ranking"] }) => {
  const goToClass = (degree: string, year: number) => {
    window.open(`/ranking/degrees/${degree}/${year}`, "_self");
  };

  return (
    <div className={styles.groupsTable}>
      <table>
        <thead>
          <th>Rank</th>
          <th>Turma</th>
          <th>Curso</th>
          <th>Valor de doação (R$)</th>
        </thead>
        <tbody>
          {props.ranking.map((row, index) => (
            <tr
              key={index}
              onClick={goToClass.bind(null, row.degree, row.initialYear)}
            >
              <td style={{ fontWeight: "bold" }}>#{row.position}</td>
              <td>{`${row.initialYear}-${row.finalYear}`}</td>
              <td style={{ textAlign: "left" }}>{row.degree}</td>
              <td>{new Intl.NumberFormat("pt-BR", {}).format(row.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
