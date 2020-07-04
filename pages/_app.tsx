import "../styles.scss";
import "rmwc/dist/styles";

import "@material/button/dist/mdc.button.css";
import "@material/layout-grid/dist/mdc.layout-grid.css";

import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
