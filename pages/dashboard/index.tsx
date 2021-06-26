import React from "react";
import Head from "next/head";
import { Box } from "@material-ui/core";
import { Dashboard as DashboardWrapper } from "../../components/dashboard";
import Cards from "../../components/dashboard/Layout/Cards";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSession from "../../hooks/useSession";
import getBalance, {
  BalanceGrouping,
  Balance,
} from "../../use_cases/getBalance";
import createDIContainer from "../../dependency_injection/createDIContainer";
import { PrismaClient } from "@prisma/client";
// import useDarkMode from "use-dark-mode";

interface Props {
  loggedIn?: boolean;
  email?: string;
  balance?: Balance[];
}

const Dashboard = ({ loggedIn, email, balance }: Props) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push("/");
    }
  }, [session, loading]);

  console.log(loggedIn);
  console.log(email);
  console.log(balance);

  return session ? (
    <React.Fragment>
      <Head>
        <title>Reditus - Dashboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <DashboardWrapper user={session.user}>
        <Box color="#2E384D" fontSize={28} fontWeight={300} component="h2">
          Acompanhamento das doações
        </Box>
        <Cards />
      </DashboardWrapper>
    </React.Fragment>
  ) : (
    ""
  );
};

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  if (!session) {
    return { props: { loggedIn: false } };
  }

  const groupBy = BalanceGrouping.month;
  const fromDate = new Date(2020, 1, 1);
  const toDate = new Date(2021, 12, 31);
  const container = await createDIContainer();
  const scope = container.createScope();
  try {
    const dbClient: PrismaClient = scope.resolve("dbClient");

    const balance = await getBalance({
      dbClient: dbClient,
      fromDate: fromDate,
      toDate: toDate,
      groupBy: groupBy,
    });

    return {
      props: { loggedIn: true, email: session.user.email, balance: balance },
    };
  } finally {
    scope.dispose();
  }
}

export default Dashboard;
