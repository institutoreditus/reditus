import styles from "./index.module.css";
import Header from "../../../../components/ranking/Header/Header";
import DonationCallout from "../../../../components/ranking/Donate/DonateBanner";
import ResultsDisplay from "../../../../components/ranking/ResultsDisplay/ResultsDisplay";
import ShareCallout from "../../../../components/ranking/Share/ShareCallout";
import BackButton from "../../../../components/ranking/BackButton/BackButton";

const group = {
  course: "Engenharia de Produção",
  period: "2000-2005",
  description:
    "Você pode visualizar as turmas que mais contribuíram e verificar se a sua está entre elas! Uma visão geral do impacto nas receitas só está disponível mediante a realização de uma doação.",
  total: 5000,
  donors: [
    {
      name: "João da Silva",
      url: "https://www.linkedin.com/in/joao-da-silva",
    },
    {
      name: "João da Silva",
      url: "https://www.linkedin.com/in/joao-da-silva",
    },
    {
      name: "João da Silva",
      url: "https://www.linkedin.com/in/joao-da-silva",
    },
    {
      name: "João da Silva",
      url: "https://www.linkedin.com/in/joao-da-silva",
    },
  ],
};

export default function RankingPage() {
  const donated = true;

  return (
    <div className={styles.html}>
      <main className={styles.rankingPage}>
        <DonationCallout />
        <div className={styles.content}>
          <BackButton />
          <Header
            tag={group.course}
            title={group.period}
            description={group.description}
          />
          <ResultsDisplay amount={group.total} count={group.donors.length} />
          <Donors userDonated={donated} donors={group.donors} />

          {!donated && (
            <p>Você precisa doar para poder visualizar aos doadores</p>
          )}

          <ShareCallout donate whatsApp linkedIn copy />
        </div>
      </main>
    </div>
  );
}

const Donors = ({
  userDonated,
  donors,
}: {
  userDonated: boolean;
  donors: { name: string; url: string }[];
}) => {
  return (
    <div className={userDonated ? styles.donors : styles.hideDonors}>
      {donors.map((donor) => (
        <button
          className={styles.donor}
          onClick={() => {
            if (userDonated && donor.url) window.open(donor.url, "_blank");
          }}
        >
          <p>{donor.name}</p>
        </button>
      ))}
    </div>
  );
};
