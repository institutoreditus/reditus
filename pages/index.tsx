import Head from "next/head";
import { GridRow, GridCell } from "@rmwc/grid";
import { List, SimpleListItem} from "@rmwc/list";
import { TextField } from "@rmwc/textfield";
import styles from "./index.module.css";

// Components

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GridRow>
          <GridCell className={styles.leftSide} span={4} align={"middle"}>
            <>
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
            </>
          </GridCell>
          <GridCell className={styles.rightSide} span={8} align={"middle"}>
            <h1 className="title">Welcome to Reditus</h1>
            <TextField fullwidth label="fullWidth..." />
            <TextField fullwidth label="standard..." />
          </GridCell>
        </GridRow>
      </main>
    </div>
  );
}
