import Rox from "./RoxInstance";
if (!Rox.containerCache) {
  Rox.containerCache = {
    suggestedDonationValues: new Rox.Variant("25|75|150", [
      "25|75|150",
      "50|150|300",
      "150|300|500",
    ]),
  };
}
export default Rox.containerCache;
