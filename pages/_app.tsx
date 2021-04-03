import "@material/theme/dist/mdc.theme.css";
import "@rmwc/theme/theme.css";
import "@material/form-field/dist/mdc.form-field.css";
import "@material/typography/dist/mdc.typography.css";
import "@material/button/dist/mdc.button.css";
import "@material/checkbox/dist/mdc.checkbox.css";
import "@material/layout-grid/dist/mdc.layout-grid.css";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/list/dist/mdc.list.css";
import "@material/ripple/dist/mdc.ripple.css";
import "@rmwc/icon/icon.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import "@material/radio/dist/mdc.radio.css";
import "@material/drawer/dist/mdc.drawer.css";

import "@rmwc/select/select.css";
import "@material/select/dist/mdc.select.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";
import "@material/menu/dist/mdc.menu.css";
import "@material/menu-surface/dist/mdc.menu-surface.css";

import "../styles.css";

import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../helpers/gtag";
import * as gtm from "../helpers/gtm";

const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.HEROKU_APP_NAME === "reditus-next-staging";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction && gtag.GA_TRACKING_ID) {
        gtag.pageview(url);
      }
      if (isProduction && gtm.GTM_TRACKING_ID) {
        gtm.pageview(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return <Component {...pageProps} />;
}

export default App;
