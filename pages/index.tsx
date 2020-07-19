import Head from "next/head";
import { GridRow, GridCell } from "@rmwc/grid";
import { List, SimpleListItem } from "@rmwc/list";
import styles from "./index.module.css";

// Components
import { ContributionButton } from "../components/ContributionButton";

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

      <main>
        <GridRow>
          <GridCell className={styles.leftSide} span={4} align={"middle"}>
            <p>Tornando-se parte dessa iniciativa você...</p>
            <List twoLine>
              <SimpleListItem
                graphic="radio_button_checked"
                text="retorna um bem a comunidade UFRJ"
              />
              <SimpleListItem
                graphic="radio_button_checked"
                text="ajuda a fomentar uma estrutura de auxílio a alunos e equipes de competição"
              />
              <SimpleListItem
                graphic="radio_button_checked"
                text="perpetua uma cultura de retribuição"
              />
            </List>
          </GridCell>
          <GridCell className={styles.rightSide} span={8} align={"middle"}>
            <img src="./logoReditusWhite.png" />
            <p className="title">
              Faça parte dessa corrente do bem! Ajude a fomentar uma cultura de
              retribuição.
            </p>
            <ContributionButton />
          </GridCell>
        </GridRow>
      </main>
    </div>
  );
}
