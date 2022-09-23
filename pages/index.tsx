import Head from "next/head";
import { GridRow, GridCell } from "@rmwc/grid";
import { List, SimpleListItem } from "@rmwc/list";
import styles from "./index.module.css";

// Components
import { Donation } from "../components/Donation";

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
            <p>Tornando-se parte dessa iniciativa você...</p>
            <List nonInteractive={true}>
              <SimpleListItem
                ripple={false}
                graphic="radio_button_checked"
                text="retorna um bem à comunidade de alunos e ex-alunos da UFRJ"
              />
              <SimpleListItem
                ripple={false}
                graphic="radio_button_checked"
                text="ajuda a fomentar uma estrutura de auxílio a alunos e equipes de competição"
              />
              <SimpleListItem
                ripple={false}
                graphic="radio_button_checked"
                text="perpetua uma cultura de retribuição"
              />
            </List>
          </div>
          <div className={styles.rightSide}>
            <img src="./logoReditusWhite.png" />
            <Donation />
          </div>
      </main>
    </div>
  );
}
