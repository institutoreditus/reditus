import "@material/theme/dist/mdc.theme.css";
import "@rmwc/theme/theme.css";
import "@material/button/dist/mdc.button.css";
import "@material/layout-grid/dist/mdc.layout-grid.css";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/list/dist/mdc.list.css";
import "@material/ripple/dist/mdc.ripple.css";
import "@rmwc/icon/icon.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import "@material/radio/dist/mdc.radio.css";

import "../styles.css";

import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../helpers/gtag";

const isProduction = process.env.NODE_ENV === "production";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction && gtag.GA_TRACKING_ID) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return <Component {...pageProps} />;
}

export default App;
