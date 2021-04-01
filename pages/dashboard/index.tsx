import React from "react";
import Head from "next/head";
import { Box } from "@material-ui/core";

import { Dashboard as DashboardWrapper } from "../../components/dashboard";
import Cards from "../../components/dashboard/Layout/Cards";
// import useDarkMode from "use-dark-mode";

function Dashboard() {
  // const { Component, pageProps } = props;
  // const { value: isDark } = useDarkMode(true);

  // const themeConfig = isDark ? darkTheme : lightTheme;

  return (
    <React.Fragment>
      <Head>
        <title>Reditus - Dashboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <DashboardWrapper>
        <Box color="#2E384D" fontSize={28} fontWeight={300} component="h2">
          Acompanhamento das doações
        </Box>
        <Cards />
      </DashboardWrapper>
    </React.Fragment>
  );
}

export default Dashboard;
