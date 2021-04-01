import Head from "next/head";
import { GridRow, GridCell } from "@rmwc/grid";
import { List, SimpleListItem } from "@rmwc/list";
import styles from "./index.module.css";

// Components
import { Form } from "../components/Form";

export default function Home() {
  return (
    <div className={styles.body}>
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
          <GridCell
            order={0}
            className={styles.leftSide}
            desktop={4}
            align={"middle"}
          >
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
          </GridCell>
          <GridCell
            order={1}
            className={styles.rightSide}
            desktop={8}
            tablet={12}
            phone={12}
            align={"middle"}
          >
            <img src="./logoReditusWhite.png" />
            <Form />
          </GridCell>
        </GridRow>
      </main>
    </div>
  );
}
