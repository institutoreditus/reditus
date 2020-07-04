import Head from "next/head";
import { Grid, GridRow, GridCell } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";

//Components

export default function Home() {
  return (
    <div>
      <Head>
        <title>Reditus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GridRow>
          <GridCell className="leftSide" span={4} align="middle" style={{padding: '10px 2rem'}}>
            <>
            </>
          </GridCell>
          <GridCell className="rightSide" span={8} align={'middle'} style={{padding: '10px 25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', verticalAlign: 'middle',}}>
            <>
                <h1 className="title">
                  Welcome to Reditus
                </h1>
                <TextField fullwidth label="fullWidth..." />
                <TextField fullwidth label="standard..." />
              </>
          </GridCell>
        </GridRow>
      </main>
    </div>
  );
}
