import Head from "next/head";
import { GridRow, GridCell } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";

// Components

export default function Home() {
  return (
    <div>
      <Head>
        <title>Reditus</title>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GridRow>
          <GridCell
            className="leftSide"
            span={4}
            align="middle"
            style={{ padding: "10px 2rem" }}
          >
            <></>
          </GridCell>
          <GridCell
            className="rightSide"
            span={8}
            align={"middle"}
            style={{
              padding: "10px 25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              verticalAlign: "middle",
            }}
          >
            <>
              <h1 className="title">Welcome to Reditus</h1>
              <TextField fullwidth label="fullWidth..." />
              <TextField fullwidth label="standard..." />
            </>
          </GridCell>
        </GridRow>
      </main>
    </div>
  );
}
