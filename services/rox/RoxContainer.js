import { Rox, Variant } from "rox-ssr";
if (!Rox.containerCache) {
  Rox.containerCache = {
    suggestedDonationValues: new Variant("25|75|150", [
      "25|75|150",
      "50|150|300",
      "150|300|500",
    ]),
  };
}
export default Rox.containerCache;
