// import { Children } from "react";
import Layout from "./Layout";

export const Dashboard = ({ children, ...pageProps }: any) => {
  return <Layout {...pageProps}>{children}</Layout>;
};

export default Dashboard;
