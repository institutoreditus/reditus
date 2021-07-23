export enum ReditusEvent {
  click = "Reditus Click",
  type = "Reditus Type",
  info = "Reditus Info",
}

// Used by Google Tag Manager
export const GTM_TRACKING_ID: string = process.env.GTM_TRACKING_ID || "";

// https://developers.google.com/tag-manager/quickstart
export const pageview = (url: URL) => {
  interface PageEventProps {
    event: string;
    page: string;
  }

  const pageEvent: PageEventProps = {
    event: "pageview",
    page: url.toString(),
  };
  // @ts-ignore
  window && window.dataLayer && window.dataLayer.push(pageEvent);
  return pageEvent;
};

// Pushes the object to the data layer.
export const push = (e: ReditusEvent, id: string) => {
  const data = { event: e, "Reditus ID": id };
  // @ts-ignore
  window && window.dataLayer && window.dataLayer.push(data);
};
