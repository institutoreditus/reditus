import Head from "next/head";
import styles from "./index.module.css";

// Components
import { Donation } from "../components/Donation";
import Reasons from "../components/Reasons";

export default function Home() {
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

      <main className={styles.main}>
        <div className={styles.leftSide}>
          <Reasons />
        </div>
        <div className={styles.rightSide}>
          <img src="./logoReditusWhite.png" />
          <Donation />
        </div>
      </main>
    </div>
  );
}
