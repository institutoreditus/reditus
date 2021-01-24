import Head from "next/head";
import { GridCell } from "@rmwc/grid";
import styles from "./index.module.css";
import { PrismaClient } from "@prisma/client";
import getMessage from "../middlewares/messageMiddleware";
import * as Messages from "../strings/pt/messages.json";

console.log(getMessage(Messages.invalid_data));

// Components
import Chart from "../components/ChartContributionTotal";
// Queries
export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const UserID = "'guilhermeangstmann@gmail.com'";
  
  // Query1contributions
  const accumulated = await prisma.queryRaw(
    `with data as(
            SELECT  date_trunc(\'day\', "createdAt") "day",
                  SUM(amount_in_cents)/100 as Total_by_day 
            FROM contributions 
            Group By "day"
            ) 
            SELECT "day", 
                      SUM(Total_by_day) over (order by "day" asc rows 
                                                between unbounded preceding 
                                                and current row) as accumulated	\
            FROM data`
  );
  // Query2
  const accumulated_value = await prisma.queryRaw(
    "SELECT SUM(amount_in_cents)/100 as accumulated_value\
     FROM contributions"
  );
  // Query3
  const individual_accumulated_contribution = await prisma.queryRaw(
    `SELECT SUM(amount_in_cents)/100 as individual_accumulated_contribution 
     FROM contributions 
     WHERE email = ${UserID}`
  );

  // Query4 - trying to solve a problem with 'SET dataestyle to DMY, SQL;'
  const my_activities = await prisma.queryRaw(
    `SELECT "createdAt"::TIMESTAMP::DATE,
        amount_in_cents/100 as individual_contribution,
        subscription_id,
             Case WHEN subscription_id IS NOT NULL THEN \'Assinatura\' 
             Else \'Doação Pontual\' 
             END AS contribution_type 
        FROM contributions 
        WHERE  email = ${UserID} 
        Order by "createdAt" ASC 
        Limit 6;`
  );

  return {
    props: {
      accumulated: accumulated,
      accumulated_value: accumulated_value,
      individual_accumulated_contribution: individual_accumulated_contribution,
      my_activities: my_activities,
    },
  };
}
export default function Home({ accumulated }) {
  return (
    <div>
      <Head>
        <title>Reditus</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <script src="https://assets.pagar.me/checkout/1.1.0/checkout.js"></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GridCell
        order={1}
        className={styles.rightSide}
        desktop={12}
        tablet={12}
        phone={12}
        align={"middle"}
      >
        <div>
          <Chart result={accumulated} />
        </div>
      </GridCell>
    </div>
  );
}
