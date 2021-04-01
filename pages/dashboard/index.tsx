import React from "react";
import Head from "next/head";

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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <DashboardWrapper>
        <Cards />
      </DashboardWrapper>
    </React.Fragment>
  );
}

export default Dashboard;
