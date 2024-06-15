import styles from "./index.module.css";
import Header from "../../../../../components/ranking/Header/Header";
import DonationCallout from "../../../../../components/ranking/Donate/DonateBanner";
import ResultsDisplay from "../../../../../components/ranking/ResultsDisplay/ResultsDisplay";
import ShareCallout from "../../../../../components/ranking/Share/ShareCallout";
import BackButton from "../../../../../components/ranking/BackButton/BackButton";
import { useRouter } from "next/router";
import { GetClassData } from "../../../../api/ranking/types";
import { useState, useEffect } from "react";

const getClassData = async (degree: string, year: string) => {
  const response = await fetch(`/api/ranking/degrees/${degree}/${year}`);
  return (await response.json()) as GetClassData;
};

export default function ClassPage() {
  const [data, setData] = useState<GetClassData>({
    amount: 0,
    numberOfDonors: 0,
    donors: [],
  });

  const donated = true;

  const router = useRouter();
  const degree = router.query.degree as string;
  const year = router.query.year as string;

  useEffect(() => {
    getClassData(degree, year).then(setData);
  });

  if (Number(year) < 1900) {
    return <p>Invalid year</p>;
  }

  return (
    <div className={styles.html}>
      <main className={styles.rankingPage}>
        <DonationCallout />
        <div className={styles.content}>
          <BackButton />
          <Header
            tag={degree}
            tagOnClick={() => {
              window.open("/ranking/degrees/" + degree, "_self");
            }}
            title={year + "-" + String(Number(year) + 4)}
            description={"Any"}
          />
          <ResultsDisplay amount={data.amount} count={data.numberOfDonors} />
          <Donors userDonated={donated} donors={data.donors} />

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
  donors: { name: string; url?: string }[];
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
