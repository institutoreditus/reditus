import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../helpers/gtag";
import { GTM_TRACKING_ID } from "../helpers/gtm";

const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* Enables analytics script only in production */}
          {isProduction && GA_TRACKING_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          )}
          {/* Enables Google Tag Manager only in production. */}
          {isProduction && GTM_TRACKING_ID && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_TRACKING_ID}');`,
                }}
              />
            </>
          )}
          {/* End Google Tag Manager */}
          {/* Enabled Facebook Pixel only in production. */}
          {isProduction && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '3225839960976651');
                  fbq('track', 'PageView');`,
                }}
              />
              <noscript>
                <img
                  height="1"
                  width="1"
                  src="https://www.facebook.com/tr?id=3225839960976651&ev=PageView&noscript=1"
                />
              </noscript>
            </>
          )}
          {/* End Facebook Pixel */}
          {/* Enable Facebook Pixel 2.0 only in production. */}
          {isProduction && (
            <>
              <meta
                name="facebook-domain-verification"
                content="vf4ad1m6a1m5w98ttfp3j2ilt557on"
              />
            </>
          )}
          {/* End Facebook Pixel */}
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          {isProduction && GTM_TRACKING_ID && (
            <>
              <noscript
                dangerouslySetInnerHTML={{
                  __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_TRACKING_ID}" height="0" width="0" 
                  style="display:none;visibility:hidden"></iframe>`,
                }}
              />
            </>
          )}
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
