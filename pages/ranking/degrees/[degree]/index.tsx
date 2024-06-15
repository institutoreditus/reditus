import Head from "next/head";
import styles from "./index.module.css";
import ShareCallout from "../../../../components/ranking/Share/ShareCallout";
import DonationCallout from "../../../../components/ranking/Donate/DonateBanner";
import ResultsDisplay from "../../../../components/ranking/ResultsDisplay/ResultsDisplay";
import Header from "../../../../components/ranking/Header/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetRankingData } from "../../../api/ranking/types";

const getRankingData = async (degree: string) => {
  const response = await fetch(`/api/ranking/degrees/${degree}`);
  return (await response.json()) as GetRankingData;
};

export default function DegreeRankingPage() {
  const router = useRouter();
  const degree = router.query.degree as string;
  const [data, setData] = useState<GetRankingData>({
    amount: 0,
    numberOfDonors: 0,
    ranking: [],
  });

  useEffect(() => {
    getRankingData(degree).then(setData);
  }, [router.query.degree]);

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
            tag="UFRJ"
            tagOnClick={() => {
              window.open("/ranking", "_self");
            }}
            title={degree}
            description="Você pode visualizar as turmas que mais contribuíram e verificar se a sua está entre elas! Uma visão geral do impacto nas receitas só está disponível mediante a realização de uma doação."
          />
          <ResultsDisplay amount={data.amount} count={data.numberOfDonors} />
          <Table ranking={data.ranking} />
          <ShareCallout donate whatsApp linkedIn copy />
        </div>
      </main>
    </div>
  );
}

const Table = (props: { ranking: GetRankingData["ranking"] }) => {
  return (
    <div className={styles.groupsTable}>
      <table>
        <thead>
          <th>Rank</th>
          <th>Turma</th>
          <th>Valor de doação (R$)</th>
        </thead>
        <tbody>
          {props.ranking.map((row, index) => (
            <tr
              key={index}
              onClick={() => {
                window.open(
                  `/ranking/degrees/${row.degree}/${row.initialYear}`,
                  "_self"
                );
              }}
            >
              <td style={{ fontWeight: "bold" }}>#{row.position}</td>
              <td>{`${row.initialYear} - ${row.finalYear}`}</td>
              <td>{new Intl.NumberFormat("pt-BR", {}).format(row.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
