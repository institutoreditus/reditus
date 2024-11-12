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
            O Instituto Reditus é uma instituição formada por alunos e ex-alunos com o objetivo de fortalecer a comunidade da UFRJ.
            Fornecemos apoio financeiro a projetos de inovação, mentoria, e suporte para alunos de baixa renda.
            Retribua pela sua educação e convide a sua turma para participar dessa competição!
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

  const place = (position: number) => {
    if (position === 1) {
      return "🥇";
    } else if (position === 2) {
      return "🥈";
    } else if (position === 3) {
      return "🥉";
    } else {
      return position + "º";
    }
  };

  return (
    <div className={styles.groupsTable}>
      <table>
        <thead>
          <th>#</th>
          <th style={{ textAlign: "left" }}>Curso (anos de entrada)</th>
          <th>Doadores</th>
          <th>Total</th>
        </thead>
        <tbody>
          {props.ranking.map((row, index) => (
            <tr
              key={index}
              onClick={goToClass.bind(null, row.degree, row.initialYear)}
            >
              <td
                style={{
                  fontWeight: "bold",
                  fontSize: row.position <= 3 ? "28px" : undefined,
                }}
              >
                {place(row.position)}
              </td>
              <td style={{ textAlign: "left" }}>
                {row.degree} ({row.initialYear} - {row.finalYear})
              </td>
              <td>{row.numberOfDonors}</td>
              <td>
                R$ {new Intl.NumberFormat("pt-BR", {}).format(row.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
